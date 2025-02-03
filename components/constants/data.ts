import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    shortcut: ["g", "d"],
  },
  {
    title: "News Management",
    icon: "news",
    shortcut: ["g", "n"],
    items: [
      { title: "Add News", url: "/dashboard/news/add" },
      { title: "Edit News", url: "/dashboard/news/edit" },
      { title: "Delete News", url: "/dashboard/news/delete" },
      { title: "All News List", url: "/dashboard/news/list" },
      { title: "Scheduled News", url: "/dashboard/news/scheduled" },
    ],
  },
  {
    title: "Categories",
    icon: "category",
    shortcut: ["g", "c"],
    items: [
      { title: "Add Category", url: "/dashboard/categories/add" },
      { title: "Edit Category", url: "/dashboard/categories/edit" },
      { title: "Delete Category", url: "/dashboard/categories/delete" },
      { title: "All Categories", url: "/dashboard/categories/list" },
    ],
  },
  {
    title: "Users Management",
    icon: "users",
    shortcut: ["g", "u"],
    items: [
      { title: "All Users", url: "/dashboard/users/all" },
      { title: "Admins & Journalists", url: "/dashboard/users/admins" },
      { title: "Banned Users", url: "/dashboard/users/banned" },
      { title: "Add New User", url: "/dashboard/users/add" },
    ],
  },
  {
    title: "Comments & Feedback",
    icon: "comments",
    shortcut: ["g", "f"],
    items: [
      { title: "Approved Comments", url: "/dashboard/comments/approved" },
      { title: "Pending Comments", url: "/dashboard/comments/pending" },
      { title: "Spam & Reported", url: "/dashboard/comments/spam" },
    ],
  },
  {
    title: "Media Library",
    icon: "media",
    shortcut: ["g", "m"],
    items: [
      { title: "Upload Media", url: "/dashboard/media/upload" },
      { title: "Video Management", url: "/dashboard/media/videos" },
      { title: "Image Gallery", url: "/dashboard/media/images" },
    ],
  },
  {
    title: "Settings",
    icon: "settings",
    shortcut: ["g", "s"],
    items: [
      { title: "Website Settings", url: "/dashboard/settings/website" },
      { title: "Email & Notifications", url: "/dashboard/settings/email" },
      { title: "Security & Permissions", url: "/dashboard/settings/security" },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: "analytics",
    shortcut: ["g", "a"],
    items: [
      { title: "Traffic Report", url: "/dashboard/analytics/traffic" },
      { title: "Popular News", url: "/dashboard/analytics/popular" },
      { title: "User Engagement", url: "/dashboard/analytics/engagement" },
      { title: "SEO Performance", url: "/dashboard/analytics/seo" },
    ],
  },
  {
    title: "Advertisement",
    icon: "ads",
    shortcut: ["g", "v"],
    items: [
      { title: "Banner Ads", url: "/dashboard/ads/banners" },
      { title: "Sponsored Articles", url: "/dashboard/ads/sponsored" },
      { title: "Ad Revenue Reports", url: "/dashboard/ads/reports" },
    ],
  },
  {
    title: "Notifications",
    icon: "bell",
    shortcut: ["g", "n"],
    items: [
      { title: "New Comments", url: "/dashboard/notifications/comments" },
      { title: "Breaking News Alerts", url: "/dashboard/notifications/alerts" },
      { title: "Article Approval", url: "/dashboard/notifications/approvals" },
    ],
  },
];
