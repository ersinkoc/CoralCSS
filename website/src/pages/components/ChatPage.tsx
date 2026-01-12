import { ComponentPageLayout } from './ComponentPageLayout'

// Chat/Communication component data
const chatComponents = [
  {
    id: 'chat-bubble',
    name: 'ChatBubble',
    description: 'A message bubble for chat interfaces with support for different alignments and states.',
    usage: `<!-- Received message -->
<div class="flex gap-3 max-w-md">
  <div class="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
  <div>
    <div class="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
      <p class="text-foreground">Hey! How are you doing?</p>
    </div>
    <span class="text-xs text-muted-foreground ml-2 mt-1">10:30 AM</span>
  </div>
</div>

<!-- Sent message -->
<div class="flex gap-3 max-w-md ml-auto flex-row-reverse">
  <div class="w-8 h-8 bg-primary rounded-full flex-shrink-0"></div>
  <div class="text-right">
    <div class="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2">
      <p>I'm doing great, thanks!</p>
    </div>
    <span class="text-xs text-muted-foreground mr-2 mt-1">10:31 AM ✓✓</span>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"sent" | "received"', default: '"received"', description: 'Message direction' },
      { name: 'data-status', type: '"sending" | "sent" | "delivered" | "read"', default: '"sent"', description: 'Message status' },
    ],
    preview: ChatBubblePreview,
  },
  {
    id: 'typing-indicator',
    name: 'TypingIndicator',
    description: 'Animated dots showing someone is typing.',
    usage: `<div class="flex gap-3 max-w-md">
  <div class="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
  <div class="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
    <div class="flex gap-1">
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-user', type: 'string', default: '""', description: 'Name of user typing' },
    ],
    preview: TypingIndicatorPreview,
  },
  {
    id: 'message-input',
    name: 'MessageInput',
    description: 'A text input with send button and optional attachments.',
    usage: `<div class="flex items-end gap-2 p-3 bg-card border-t border-b border-border">
  <button class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full">
    <svg class="w-6 h-6"><!-- attachment icon --></svg>
  </button>
  <div class="flex-1 relative">
    <textarea
      placeholder="Type a message..."
      rows="1"
      class="w-full px-4 py-2 bg-muted rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
    ></textarea>
    <button class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground">
      <svg class="w-5 h-5"><!-- emoji icon --></svg>
    </button>
  </div>
  <button class="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
    <svg class="w-6 h-6"><!-- send icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-attachments', type: 'boolean', default: 'true', description: 'Show attachment button' },
      { name: 'data-emoji', type: 'boolean', default: 'true', description: 'Show emoji picker' },
    ],
    preview: MessageInputPreview,
  },
  {
    id: 'chat-list',
    name: 'ChatList',
    description: 'A list of conversations with previews and unread badges.',
    usage: `<div class="divide-y divide-border">
  <div class="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer">
    <div class="relative">
      <div class="w-12 h-12 bg-muted rounded-full"></div>
      <span class="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-card rounded-full"></span>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-foreground truncate">John Doe</h3>
        <span class="text-xs text-muted-foreground">10:30 AM</span>
      </div>
      <p class="text-sm text-muted-foreground truncate">Hey! How are you?</p>
    </div>
    <span class="w-5 h-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">3</span>
  </div>
</div>`,
    props: [
      { name: 'data-show-status', type: 'boolean', default: 'true', description: 'Show online status' },
      { name: 'data-show-unread', type: 'boolean', default: 'true', description: 'Show unread count' },
    ],
    preview: ChatListPreview,
  },
  {
    id: 'message-reactions',
    name: 'MessageReactions',
    description: 'Emoji reactions on messages with count.',
    usage: `<div class="flex flex-wrap gap-1 mt-1">
  <button class="inline-flex items-center gap-1 px-2 py-0.5 bg-muted hover:bg-muted rounded-full text-sm">
    <span>👍</span>
    <span class="text-muted-foreground">3</span>
  </button>
  <button class="inline-flex items-center gap-1 px-2 py-0.5 bg-muted hover:bg-muted rounded-full text-sm">
    <span>❤️</span>
    <span class="text-muted-foreground">2</span>
  </button>
  <button class="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-sm">
    <span>😂</span>
    <span>1</span>
  </button>
  <button class="px-2 py-0.5 text-muted-foreground/70 hover:bg-muted rounded-full text-sm">+</button>
</div>`,
    props: [
      { name: 'data-reactions', type: 'Reaction[]', default: '[]', description: 'Array of reactions' },
    ],
    preview: MessageReactionsPreview,
  },
  {
    id: 'voice-message',
    name: 'VoiceMessage',
    description: 'A voice message player with waveform visualization.',
    usage: `<div class="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3 max-w-xs">
  <button class="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
    <svg class="w-5 h-5"><!-- play icon --></svg>
  </button>
  <div class="flex-1">
    <div class="flex items-center gap-0.5 h-6">
      <!-- waveform bars -->
      <span class="w-1 h-2 bg-muted-foreground/50 rounded-full"></span>
      <span class="w-1 h-4 bg-muted-foreground/50 rounded-full"></span>
      <span class="w-1 h-6 bg-primary rounded-full"></span>
      <!-- more bars... -->
    </div>
  </div>
  <span class="text-xs text-muted-foreground">0:42</span>
</div>`,
    props: [
      { name: 'data-duration', type: 'number', default: '0', description: 'Duration in seconds' },
      { name: 'data-playing', type: 'boolean', default: 'false', description: 'Is currently playing' },
    ],
    preview: VoiceMessagePreview,
  },
  {
    id: 'message-status',
    name: 'MessageStatus',
    description: 'Status indicators for message delivery states.',
    usage: `<div class="flex gap-4 text-muted-foreground">
  <!-- Sending -->
  <span class="flex items-center gap-1 text-sm">
    <svg class="w-4 h-4 animate-spin"><!-- spinner --></svg>
    Sending
  </span>

  <!-- Sent -->
  <span class="flex items-center gap-1 text-sm">
    <svg class="w-4 h-4"><!-- single check --></svg>
    Sent
  </span>

  <!-- Delivered -->
  <span class="flex items-center gap-1 text-sm">
    <svg class="w-4 h-4"><!-- double check --></svg>
    Delivered
  </span>

  <!-- Read -->
  <span class="flex items-center gap-1 text-sm text-info">
    <svg class="w-4 h-4"><!-- double check filled --></svg>
    Read
  </span>
</div>`,
    props: [
      { name: 'data-status', type: '"sending" | "sent" | "delivered" | "read" | "failed"', default: '"sent"', description: 'Message status' },
    ],
    preview: MessageStatusPreview,
  },
  {
    id: 'chat-header',
    name: 'ChatHeader',
    description: 'Header for chat view with user info and actions.',
    usage: `<div class="flex items-center gap-3 p-4 border-b border-border bg-card">
  <button class="p-2 hover:bg-muted rounded-full md:hidden">
    <svg class="w-5 h-5"><!-- back arrow --></svg>
  </button>
  <div class="relative">
    <div class="w-10 h-10 bg-muted rounded-full"></div>
    <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-card rounded-full"></span>
  </div>
  <div class="flex-1">
    <h2 class="font-semibold text-foreground">John Doe</h2>
    <p class="text-xs text-success">Online</p>
  </div>
  <button class="p-2 hover:bg-muted rounded-full">
    <svg class="w-5 h-5"><!-- phone icon --></svg>
  </button>
  <button class="p-2 hover:bg-muted rounded-full">
    <svg class="w-5 h-5"><!-- video icon --></svg>
  </button>
  <button class="p-2 hover:bg-muted rounded-full">
    <svg class="w-5 h-5"><!-- more icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-status', type: '"online" | "offline" | "away" | "busy"', default: '"offline"', description: 'User status' },
    ],
    preview: ChatHeaderPreview,
  },
  {
    id: 'message-group',
    name: 'MessageGroup',
    description: 'Group consecutive messages from the same sender.',
    usage: `<div class="space-y-1">
  <div class="flex gap-3">
    <div class="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
    <div class="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
      <p>Hey!</p>
    </div>
  </div>
  <div class="flex gap-3">
    <div class="w-8 flex-shrink-0"></div>
    <div class="bg-muted rounded-2xl px-4 py-2">
      <p>How are you doing?</p>
    </div>
  </div>
  <div class="flex gap-3">
    <div class="w-8 flex-shrink-0"></div>
    <div class="bg-muted rounded-2xl rounded-bl-sm px-4 py-2">
      <p>Long time no see!</p>
    </div>
  </div>
</div>`,
    props: [],
    preview: MessageGroupPreview,
  },
  {
    id: 'date-separator',
    name: 'DateSeparator',
    description: 'A separator showing date between message groups.',
    usage: `<div class="flex items-center gap-4 my-4">
  <div class="flex-1 h-px bg-muted"></div>
  <span class="text-xs text-muted-foreground font-medium">Today</span>
  <div class="flex-1 h-px bg-muted"></div>
</div>`,
    props: [
      { name: 'data-date', type: 'string', default: '"Today"', description: 'Date text to display' },
    ],
    preview: DateSeparatorPreview,
  },
  {
    id: 'image-message',
    name: 'ImageMessage',
    description: 'A message containing an image with optional caption.',
    usage: `<div class="max-w-xs">
  <div class="bg-muted rounded-2xl rounded-tl-sm overflow-hidden">
    <img src="photo.jpg" alt="Shared photo" class="w-full aspect-video object-cover" />
    <p class="px-4 py-2 text-foreground">Check out this view!</p>
  </div>
  <span class="text-xs text-muted-foreground ml-2 mt-1">10:30 AM</span>
</div>`,
    props: [
      { name: 'data-caption', type: 'string', default: '""', description: 'Image caption' },
    ],
    preview: ImageMessagePreview,
  },
  {
    id: 'file-message',
    name: 'FileMessage',
    description: 'A message for sharing files with download option.',
    usage: `<div class="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3 max-w-xs">
  <div class="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
    <svg class="w-5 h-5"><!-- file icon --></svg>
  </div>
  <div class="flex-1 min-w-0">
    <p class="font-medium text-foreground truncate">document.pdf</p>
    <p class="text-xs text-muted-foreground">2.4 MB</p>
  </div>
  <button class="p-2 hover:bg-muted rounded-full">
    <svg class="w-5 h-5 text-muted-foreground"><!-- download icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-filename', type: 'string', default: '""', description: 'File name' },
      { name: 'data-size', type: 'string', default: '""', description: 'File size' },
    ],
    preview: FileMessagePreview,
  },
  {
    id: 'online-indicator',
    name: 'OnlineIndicator',
    description: 'Status dot showing user online status.',
    usage: `<div class="flex gap-4">
  <!-- Online -->
  <div class="relative">
    <div class="w-10 h-10 bg-muted rounded-full"></div>
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-card rounded-full"></span>
  </div>

  <!-- Away -->
  <div class="relative">
    <div class="w-10 h-10 bg-muted rounded-full"></div>
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-warning border-2 border-card rounded-full"></span>
  </div>

  <!-- Busy -->
  <div class="relative">
    <div class="w-10 h-10 bg-muted rounded-full"></div>
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-destructive border-2 border-card rounded-full"></span>
  </div>

  <!-- Offline -->
  <div class="relative">
    <div class="w-10 h-10 bg-muted rounded-full"></div>
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-muted-foreground/50 border-2 border-card rounded-full"></span>
  </div>
</div>`,
    props: [
      { name: 'data-status', type: '"online" | "away" | "busy" | "offline"', default: '"offline"', description: 'User status' },
    ],
    preview: OnlineIndicatorPreview,
  },
  {
    id: 'reply-preview',
    name: 'ReplyPreview',
    description: 'Preview of the message being replied to.',
    usage: `<div class="flex items-center gap-2 p-2 bg-muted/50 border-l-4 border-primary rounded">
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-primary">John Doe</p>
    <p class="text-sm text-muted-foreground truncate">The original message text here...</p>
  </div>
  <button class="p-1 text-muted-foreground/70 hover:text-muted-foreground">
    <svg class="w-4 h-4"><!-- x icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-author', type: 'string', default: '""', description: 'Original message author' },
      { name: 'data-content', type: 'string', default: '""', description: 'Original message content' },
    ],
    preview: ReplyPreviewPreview,
  },
  {
    id: 'video-call-button',
    name: 'VideoCallButton',
    description: 'Buttons for initiating voice and video calls.',
    usage: `<div class="flex gap-2">
  <button class="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-full hover:bg-success/90 transition-colors">
    <svg class="w-5 h-5"><!-- phone icon --></svg>
    Voice Call
  </button>
  <button class="flex items-center gap-2 px-4 py-2 bg-info text-info-foreground rounded-full hover:bg-info/90 transition-colors">
    <svg class="w-5 h-5"><!-- video icon --></svg>
    Video Call
  </button>
</div>`,
    props: [
      { name: 'data-type', type: '"voice" | "video"', default: '"voice"', description: 'Call type' },
    ],
    preview: VideoCallButtonPreview,
  },
  {
    id: 'chat-notification',
    name: 'ChatNotification',
    description: 'System notification within chat (user joined, left, etc.).',
    usage: `<div class="flex justify-center my-4">
  <span class="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
    John has joined the chat
  </span>
</div>

<div class="flex justify-center my-4">
  <span class="px-3 py-1 bg-warning/10 text-warning text-xs rounded-full">
    Messages are end-to-end encrypted
  </span>
</div>`,
    props: [
      { name: 'data-type', type: '"info" | "warning" | "success"', default: '"info"', description: 'Notification type' },
    ],
    preview: ChatNotificationPreview,
  },
  {
    id: 'read-receipts',
    name: 'ReadReceipts',
    description: 'Avatar stack showing who has read the message.',
    usage: `<div class="flex items-center gap-1 mt-1">
  <span class="text-xs text-muted-foreground">Seen by</span>
  <div class="flex -space-x-2">
    <div class="w-5 h-5 bg-info rounded-full border-2 border-foreground"></div>
    <div class="w-5 h-5 bg-success rounded-full border-2 border-foreground"></div>
    <div class="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center text-foreground text-[10px]" style={{ backgroundColor: 'hsl(var(--accent))' }}>
      +3
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-readers', type: 'User[]', default: '[]', description: 'Users who have read the message' },
    ],
    preview: ReadReceiptsPreview,
  },
]

// Preview components
function ChatBubblePreview() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex gap-3 max-w-md">
        <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, hsl(var(--info)), hsl(var(--info) / 0.7))' }}></div>
        <div>
          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
            <p className="text-foreground">Hey! How are you doing?</p>
          </div>
          <span className="text-xs text-muted-foreground ml-2 mt-1 block">10:30 AM</span>
        </div>
      </div>

      <div className="flex gap-3 max-w-md ml-auto flex-row-reverse">
        <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.7))' }}></div>
        <div className="text-right">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2">
            <p>I'm doing great, thanks! Just finished the project.</p>
          </div>
          <span className="text-xs text-muted-foreground mr-2 mt-1 block">10:31 AM ✓✓</span>
        </div>
      </div>

      <div className="flex gap-3 max-w-md">
        <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, hsl(var(--info)), hsl(var(--info) / 0.7))' }}></div>
        <div>
          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
            <p className="text-foreground">That's awesome! 🎉</p>
          </div>
          <span className="text-xs text-muted-foreground ml-2 mt-1 block">10:32 AM</span>
        </div>
      </div>
    </div>
  )
}

function TypingIndicatorPreview() {
  return (
    <div className="flex gap-3 max-w-md">
      <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, hsl(var(--info)), hsl(var(--info) / 0.7))' }}></div>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  )
}

function MessageInputPreview() {
  return (
    <div className="flex items-end gap-2 p-3 bg-card border border-border rounded-xl">
      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </button>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <button className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  )
}

function ChatListPreview() {
  const chats = [
    { name: 'John Doe', message: 'Hey! How are you?', time: '10:30 AM', unread: 3, online: true },
    { name: 'Jane Smith', message: 'The meeting is at 3pm', time: '9:45 AM', unread: 0, online: true },
    { name: 'Team Chat', message: 'Alice: See you tomorrow!', time: 'Yesterday', unread: 12, online: false },
  ]

  return (
    <div className="divide-y divide-border border border-border rounded-xl overflow-hidden w-full max-w-xl mx-auto">
      {chats.map((chat, i) => (
        <div key={i} className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/80 rounded-full"></div>
            {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-card rounded-full"></span>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
              <span className="text-xs text-muted-foreground">{chat.time}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
          </div>
          {chat.unread > 0 && (
            <span className="w-5 h-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
              {chat.unread}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function MessageReactionsPreview() {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      <button className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted hover:bg-muted rounded-full text-sm">
        <span>👍</span>
        <span className="text-muted-foreground">3</span>
      </button>
      <button className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted hover:bg-muted rounded-full text-sm">
        <span>❤️</span>
        <span className="text-muted-foreground">2</span>
      </button>
      <button className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-sm">
        <span>😂</span>
        <span>1</span>
      </button>
      <button className="px-2 py-0.5 text-muted-foreground/70 hover:bg-muted rounded-full text-sm">+</button>
    </div>
  )
}

function VoiceMessagePreview() {
  return (
    <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3 w-full max-w-sm mx-auto">
      <button className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
      <div className="flex-1">
        <div className="flex items-end gap-0.5 h-6">
          {[2, 4, 3, 5, 4, 6, 5, 4, 3, 5, 6, 4, 3, 4, 5, 3].map((h, i) => (
            <span key={i} className={`w-1 rounded-full ${i < 6 ? 'bg-primary' : 'bg-muted-foreground/50'}`} style={{ height: `${h * 4}px` }}></span>
          ))}
        </div>
      </div>
      <span className="text-xs text-muted-foreground flex-shrink-0">0:42</span>
    </div>
  )
}

function MessageStatusPreview() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <span className="flex items-center gap-1 text-muted-foreground">
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Sent
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 13l4 4L19 7" />
        </svg>
        Delivered
      </span>
      <span className="flex items-center gap-1 text-info">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" transform="translate(3, 0)"/>
        </svg>
        Read
      </span>
    </div>
  )
}

function ChatHeaderPreview() {
  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-xl bg-card w-full max-w-xl mx-auto">
      <button className="p-2 hover:bg-muted rounded-full md:hidden">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="relative">
        <div className="w-10 h-10 rounded-full" style={{ background: 'linear-gradient(to bottom right, hsl(var(--info)), hsl(var(--info) / 0.7))' }}></div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-card rounded-full"></span>
      </div>
      <div className="flex-1">
        <h2 className="font-semibold text-foreground">John Doe</h2>
        <p className="text-xs text-success">Online</p>
      </div>
      <button className="p-2 hover:bg-muted rounded-full">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </button>
      <button className="p-2 hover:bg-muted rounded-full">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button className="p-2 hover:bg-muted rounded-full">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
    </div>
  )
}

function MessageGroupPreview() {
  return (
    <div className="space-y-1 max-w-md">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, hsl(var(--info)), hsl(var(--info) / 0.7))' }}></div>
        <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
          <p>Hey!</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-8 flex-shrink-0"></div>
        <div className="bg-muted rounded-2xl px-4 py-2">
          <p>How are you doing?</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-8 flex-shrink-0"></div>
        <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2">
          <p>Long time no see! 😊</p>
        </div>
      </div>
    </div>
  )
}

function DateSeparatorPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-muted"></div>
        <span className="text-xs text-muted-foreground font-medium">Today</span>
        <div className="flex-1 h-px bg-muted"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-muted"></div>
        <span className="text-xs text-muted-foreground font-medium">Yesterday</span>
        <div className="flex-1 h-px bg-muted"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-muted"></div>
        <span className="text-xs text-muted-foreground font-medium">January 10, 2026</span>
        <div className="flex-1 h-px bg-muted"></div>
      </div>
    </div>
  )
}

function ImageMessagePreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-muted rounded-2xl rounded-tl-sm overflow-hidden">
        <div className="w-full aspect-video bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <svg className="w-16 h-16 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
        <p className="px-4 py-2 text-foreground">Check out this amazing view! 📸</p>
      </div>
      <span className="text-xs text-muted-foreground ml-2 mt-1 block">10:30 AM</span>
    </div>
  )
}

function FileMessagePreview() {
  return (
    <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3 w-full max-w-sm mx-auto">
      <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">project_report.pdf</p>
        <p className="text-xs text-muted-foreground">2.4 MB</p>
      </div>
      <button className="p-2 hover:bg-muted rounded-full flex-shrink-0">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  )
}

function OnlineIndicatorPreview() {
  return (
    <div className="flex gap-6">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/80 rounded-full"></div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-card rounded-full"></span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Online</p>
      </div>
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/80 rounded-full"></div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-warning border-2 border-card rounded-full"></span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Away</p>
      </div>
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/80 rounded-full"></div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-destructive border-2 border-card rounded-full"></span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Busy</p>
      </div>
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/80 rounded-full"></div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-muted-foreground/50 border-2 border-card rounded-full"></span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Offline</p>
      </div>
    </div>
  )
}

function ReplyPreviewPreview() {
  return (
    <div className="space-y-3 max-w-md">
      <div className="flex items-center gap-2 p-2 bg-muted/50 border-l-4 border-primary rounded">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-primary">John Doe</p>
          <p className="text-sm text-muted-foreground truncate">Hey! How are you doing?</p>
        </div>
        <button className="p-1 text-muted-foreground/70 hover:text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function VideoCallButtonPreview() {
  return (
    <div className="flex gap-3">
      <button className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-full hover:bg-success/90 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Voice Call
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-info text-info-foreground rounded-full hover:bg-info/90 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Video Call
      </button>
    </div>
  )
}

function ChatNotificationPreview() {
  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
          John has joined the chat
        </span>
      </div>
      <div className="flex justify-center">
        <span className="px-3 py-1 bg-warning/10 text-warning text-xs rounded-full">
          🔒 Messages are end-to-end encrypted
        </span>
      </div>
      <div className="flex justify-center">
        <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs rounded-full">
          Jane has left the chat
        </span>
      </div>
    </div>
  )
}

function ReadReceiptsPreview() {
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs text-muted-foreground">Seen by</span>
      <div className="flex -space-x-2">
        <div className="w-5 h-5 bg-info rounded-full border-2 border-foreground"></div>
        <div className="w-5 h-5 bg-success rounded-full border-2 border-foreground"></div>
        <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center text-foreground text-[10px] font-medium" style={{ backgroundColor: 'hsl(var(--accent))' }}>
          +3
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <ComponentPageLayout
      categoryName="Chat & Communication"
      categoryId="chat"
      components={chatComponents}
    />
  )
}
