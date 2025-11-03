"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Bell, FileText, ShoppingBag, User, CheckCheck } from "lucide-react"

// Import the mock data
import mockNotifications from "../data/mock-notifications.json"

// Define the type for our notification data
type Notification = {
  id: string;
  type: "marketplace" | "content" | "account";
  text: string;
  time: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications as Notification[])

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const readNotifications = notifications.filter((n) => n.isRead)

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, isRead: true }))
    )
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "marketplace":
        return <ShoppingBag className="h-5 w-5" />
      case "content":
        return <FileText className="h-5 w-5" />
      case "account":
        return <User className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl">Notifications</CardTitle>
            <CardDescription>
              You have {unreadCount} unread messages.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Notifications</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* --- All Notifications Tab --- */}
            <TabsContent value="all" className="mt-6 space-y-6">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <NotificationItem
                    key={notif.id}
                    notification={notif}
                    icon={getIcon(notif.type)}
                    showSeparator={index < notifications.length - 1}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            {/* --- Unread Notifications Tab --- */}
            <TabsContent value="unread" className="mt-6 space-y-6">
              {unreadCount > 0 ? (
                notifications
                  .filter((n) => !n.isRead)
                  .map((notif, index) => (
                    <NotificationItem
                      key={notif.id}
                      notification={notif}
                      icon={getIcon(notif.type)}
                      showSeparator={index < unreadCount - 1}
                    />
                  ))
              ) : (
                <EmptyState isUnreadTab={true} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Reusable Notification Item Component ---
function NotificationItem({
  notification,
  icon,
  showSeparator,
}: {
  notification: Notification;
  icon: React.ReactNode;
  showSeparator: boolean;
}) {
  return (
    <div>
      <div className="flex items-start gap-4">
        {!notification.isRead && (
          <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
        )}
        <Avatar className={`h-10 w-10 border ${notification.isRead ? 'opacity-50' : ''}`}>
          <AvatarFallback
            className={`
              ${notification.isRead ? 'text-muted-foreground' : 'text-primary bg-primary/10'}
            `}
          >
            {icon}
          </AvatarFallback>
        </Avatar>
        <div className={`flex-1 ${notification.isRead ? 'text-muted-foreground' : ''}`}>
          <p className="text-sm">{notification.text}</p>
          <p className={`text-xs ${notification.isRead ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>
            {notification.time}
          </p>
        </div>
      </div>
      {showSeparator && <Separator className="mt-6" />}
    </div>
  )
}

// --- Reusable Empty State Component ---
function EmptyState({ isUnreadTab = false }) {
  return (
    <div className="py-20 text-center">
      <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-semibold">
        {isUnreadTab ? "All caught up!" : "No notifications yet"}
      </h3>
      <p className="mt-1 text-muted-foreground">
        {isUnreadTab
          ? "You have no unread notifications."
          : "Check back later for new updates."}
      </p>
    </div>
  )
}
