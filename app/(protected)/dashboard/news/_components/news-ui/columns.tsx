"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { format } from "date-fns";
import Image from "next/image";
import { NewsItem } from "./data/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { EditNewsDialog } from "./edit-news-dialog";
import { deleteNews } from "../../news-action";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateNews } from "../../news-action";
import toast from "react-hot-toast";

// Define the type for your news data

function StatusCell({ row }: { row: Row<NewsItem> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    row.getValue("status") as string
  );
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    const originalStatus = row.getValue("status") as string;
    try {
      // Optimistic update
      setCurrentStatus(newStatus);
      setIsEditing(false);

      // Update the database
      await updateNews({
        id: row.original.id,
        title: row.original.title,
        content: row.original.content,
        category: row.original.category,
        image: row.original.image || "",
        status: newStatus as "PUBLISHED" | "PRIVATE" | "SCHEDULED",
        scheduledAt: null,
      });

      toast.success("Status updated", {
        icon: <Check className="h-4 w-4 text-green-500" />,
      });

      // Force a refresh to update the UI
      router.refresh();
    } catch (error) {
      // Revert to the previous status if the update fails
      setCurrentStatus(originalStatus);
      toast.error("Failed to update status", {
        icon: <X className="h-4 w-4 text-red-500" />,
      });
    }
  };

  return (
    <div
      onDoubleClick={(e) => {
        e.preventDefault();
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <Select
          value={currentStatus}
          onValueChange={handleStatusChange}
          open={true}
          onOpenChange={(open) => {
            if (!open) setIsEditing(false);
          }}
        >
          <SelectTrigger className="h-8 w-[130px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div
          className={`text-center select-none font-medium rounded-full px-2.5 py-1 text-xs cursor-pointer ${
            currentStatus === "PRIVATE"
              ? "bg-yellow-100 text-yellow-800"
              : currentStatus === "SCHEDULED"
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {currentStatus}
        </div>
      )}
    </div>
  );
}

export const columns = (categories: any[]): ColumnDef<NewsItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <div className="relative h-20 w-28 overflow-hidden rounded-md bg-slate-200">
          <Image
            src={image || "/images/placeholder.jpg"}
            alt="News image"
            fill
            className="object-cover"
            onError={(e: any) => {
              e.target.src = "/images/placeholder.jpg";
            }}
            unoptimized
            loading="lazy"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return (
        <div className="max-w-[400px] truncate">
          {content.length > 50 ? `${content.substring(0, 50)}...` : content}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post Date & Time" />
    ),
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "PPpp");
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} categories={categories} />
    ),
  },
];

export function DataTableRowActions({
  row,
  categories,
}: {
  row: Row<NewsItem>;
  categories: any[];
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteNews(row.original.id);
      toast.success("News deleted successfully", {
        icon: <Check className="h-4 w-4 text-green-500" />,
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete news", {
        icon: <X className="h-4 w-4 text-red-500" />,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              news item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditNewsDialog
        news={row.original}
        categories={categories}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
