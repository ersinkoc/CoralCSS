import { ComponentPageLayout } from './ComponentPageLayout'

// File Management component data
const filesComponents = [
  {
    id: 'file-browser',
    name: 'FileBrowser',
    description: 'A file browser with folder navigation and file selection.',
    usage: `<div class="border rounded-xl overflow-hidden">
  <div class="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
    <button class="p-1 hover:bg-muted rounded">
      <svg class="w-5 h-5"><!-- back --></svg>
    </button>
    <div class="flex items-center gap-1 text-sm">
      <span class="text-muted-foreground">Home</span>
      <span class="text-muted-foreground/70">/</span>
      <span class="text-muted-foreground">Documents</span>
      <span class="text-muted-foreground/70">/</span>
      <span class="font-medium">Projects</span>
    </div>
  </div>

  <div class="divide-y divide-border">
    <div class="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer">
      <svg class="w-5 h-5 text-amber-500"><!-- folder icon --></svg>
      <span class="flex-1">Project A</span>
      <span class="text-sm text-muted-foreground">12 items</span>
    </div>
    <div class="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer">
      <svg class="w-5 h-5 text-blue-500"><!-- file icon --></svg>
      <span class="flex-1">readme.md</span>
      <span class="text-sm text-muted-foreground">2.4 KB</span>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-view', type: '"list" | "grid"', default: '"list"', description: 'Display mode' },
      { name: 'data-selectable', type: 'boolean', default: 'true', description: 'Enable file selection' },
    ],
    preview: FileBrowserPreview,
  },
  {
    id: 'file-upload',
    name: 'FileUpload',
    description: 'Drag and drop file upload zone with progress.',
    usage: `<div class="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-coral-400 hover:bg-coral-500/10/50 transition-colors cursor-pointer">
  <svg class="w-12 h-12 text-muted-foreground/70 mx-auto mb-4"><!-- upload icon --></svg>
  <p class="font-medium text-foreground">Drop files here or click to upload</p>
  <p class="text-sm text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
</div>`,
    props: [
      { name: 'data-accept', type: 'string', default: '"*"', description: 'Accepted file types' },
      { name: 'data-max-size', type: 'number', default: '10485760', description: 'Max file size in bytes' },
      { name: 'data-multiple', type: 'boolean', default: 'true', description: 'Allow multiple files' },
    ],
    preview: FileUploadPreview,
  },
  {
    id: 'upload-progress',
    name: 'UploadProgress',
    description: 'Shows file upload progress with cancel option.',
    usage: `<div class="space-y-3">
  <div class="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
    <div class="w-10 h-10 bg-blue-500/20 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5"><!-- file icon --></svg>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <p class="font-medium text-sm truncate">document.pdf</p>
        <span class="text-xs text-muted-foreground">45%</span>
      </div>
      <div class="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
        <div class="h-full bg-coral-500/100 rounded-full transition-all" style="width: 45%"></div>
      </div>
    </div>
    <button class="p-1 text-muted-foreground/70 hover:text-muted-foreground">
      <svg class="w-4 h-4"><!-- x icon --></svg>
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-progress', type: 'number', default: '0', description: 'Progress percentage' },
      { name: 'data-cancellable', type: 'boolean', default: 'true', description: 'Can be cancelled' },
    ],
    preview: UploadProgressPreview,
  },
  {
    id: 'file-card',
    name: 'FileCard',
    description: 'Grid-style file card with thumbnail and actions.',
    usage: `<div class="border rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
  <div class="aspect-square bg-muted flex items-center justify-center relative">
    <svg class="w-16 h-16 text-muted-foreground/50"><!-- file icon --></svg>
    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
      <button class="p-2 bg-card rounded-lg">
        <svg class="w-4 h-4"><!-- download --></svg>
      </button>
      <button class="p-2 bg-card rounded-lg">
        <svg class="w-4 h-4"><!-- delete --></svg>
      </button>
    </div>
  </div>
  <div class="p-3">
    <p class="font-medium text-sm truncate">filename.pdf</p>
    <p class="text-xs text-muted-foreground">2.4 MB</p>
  </div>
</div>`,
    props: [
      { name: 'data-preview', type: 'boolean', default: 'true', description: 'Show file preview' },
    ],
    preview: FileCardPreview,
  },
  {
    id: 'folder-tree',
    name: 'FolderTree',
    description: 'Hierarchical folder tree with expand/collapse.',
    usage: `<div class="space-y-1">
  <div class="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer">
    <svg class="w-4 h-4 text-muted-foreground/70"><!-- chevron down --></svg>
    <svg class="w-5 h-5 text-amber-500"><!-- folder open --></svg>
    <span class="text-sm">Documents</span>
  </div>
  <div class="ml-6 space-y-1">
    <div class="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer">
      <svg class="w-4 h-4 text-muted-foreground/70"><!-- chevron right --></svg>
      <svg class="w-5 h-5 text-amber-500"><!-- folder --></svg>
      <span class="text-sm">Projects</span>
    </div>
    <div class="flex items-center gap-2 px-2 py-1 bg-coral-500/10 rounded cursor-pointer">
      <div class="w-4 h-4"></div>
      <svg class="w-5 h-5 text-blue-500"><!-- file --></svg>
      <span class="text-sm text-coral-600">readme.md</span>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-expandable', type: 'boolean', default: 'true', description: 'Folders can expand' },
      { name: 'data-selectable', type: 'boolean', default: 'true', description: 'Items can be selected' },
    ],
    preview: FolderTreePreview,
  },
  {
    id: 'file-preview',
    name: 'FilePreview',
    description: 'Preview panel for different file types.',
    usage: `<div class="border rounded-xl overflow-hidden">
  <div class="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5 text-blue-500"><!-- file icon --></svg>
      <span class="font-medium">document.pdf</span>
    </div>
    <div class="flex items-center gap-1">
      <button class="p-2 hover:bg-muted rounded">
        <svg class="w-4 h-4"><!-- download --></svg>
      </button>
      <button class="p-2 hover:bg-muted rounded">
        <svg class="w-4 h-4"><!-- share --></svg>
      </button>
    </div>
  </div>
  <div class="aspect-[4/3] bg-muted flex items-center justify-center">
    <!-- File preview content -->
  </div>
</div>`,
    props: [
      { name: 'data-type', type: 'string', default: '""', description: 'File MIME type' },
    ],
    preview: FilePreviewPreview,
  },
  {
    id: 'storage-meter',
    name: 'StorageMeter',
    description: 'Shows storage usage with breakdown by file type.',
    usage: `<div class="space-y-4">
  <div class="flex items-center justify-between">
    <span class="font-medium">Storage</span>
    <span class="text-sm text-muted-foreground">8.2 GB of 15 GB used</span>
  </div>

  <div class="h-3 bg-muted rounded-full overflow-hidden flex">
    <div class="h-full bg-blue-500" style="width: 30%"></div>
    <div class="h-full bg-green-500/100" style="width: 15%"></div>
    <div class="h-full bg-amber-500" style="width: 10%"></div>
  </div>

  <div class="flex flex-wrap gap-4 text-sm">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-blue-500 rounded"></span>
      <span>Documents (4.5 GB)</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-green-500/100 rounded"></span>
      <span>Images (2.2 GB)</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-amber-500 rounded"></span>
      <span>Videos (1.5 GB)</span>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-used', type: 'number', default: '0', description: 'Used storage in bytes' },
      { name: 'data-total', type: 'number', default: '0', description: 'Total storage in bytes' },
    ],
    preview: StorageMeterPreview,
  },
  {
    id: 'file-type-icon',
    name: 'FileTypeIcon',
    description: 'Icons for different file types with colors.',
    usage: `<div class="flex gap-4">
  <div class="w-12 h-12 bg-red-500/20 text-red-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">PDF</span>
  </div>
  <div class="w-12 h-12 bg-blue-500/20 text-blue-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">DOC</span>
  </div>
  <div class="w-12 h-12 bg-green-500/20 text-green-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">XLS</span>
  </div>
  <div class="w-12 h-12 bg-purple-500/20 text-purple-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">ZIP</span>
  </div>
  <div class="w-12 h-12 bg-orange-500/20 text-orange-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">PPT</span>
  </div>
  <div class="w-12 h-12 bg-pink-500/20 text-pink-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">JPG</span>
  </div>
  <div class="w-12 h-12 bg-indigo-500/20 text-indigo-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">MP4</span>
  </div>
  <div class="w-12 h-12 bg-cyan-500/20 text-cyan-600 rounded-lg flex items-center justify-center">
    <span class="text-xs font-bold">MP3</span>
  </div>
</div>`,
    props: [
      { name: 'data-extension', type: 'string', default: '""', description: 'File extension' },
    ],
    preview: FileTypeIconPreview,
  },
  {
    id: 'breadcrumb-path',
    name: 'BreadcrumbPath',
    description: 'File path breadcrumb navigation.',
    usage: `<div class="flex items-center gap-1 text-sm overflow-x-auto">
  <button class="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
    <svg class="w-4 h-4"><!-- home icon --></svg>
  </button>
  <svg class="w-4 h-4 text-muted-foreground/70"><!-- chevron right --></svg>
  <button class="px-2 py-1 hover:bg-muted rounded text-muted-foreground">Documents</button>
  <svg class="w-4 h-4 text-muted-foreground/70"><!-- chevron right --></svg>
  <button class="px-2 py-1 hover:bg-muted rounded text-muted-foreground">Projects</button>
  <svg class="w-4 h-4 text-muted-foreground/70"><!-- chevron right --></svg>
  <span class="px-2 py-1 font-medium">Current Folder</span>
</div>`,
    props: [
      { name: 'data-path', type: 'string[]', default: '[]', description: 'Path segments' },
    ],
    preview: BreadcrumbPathPreview,
  },
  {
    id: 'file-actions',
    name: 'FileActions',
    description: 'Context menu or toolbar for file actions.',
    usage: `<div class="flex items-center gap-1 p-2 bg-muted/50 rounded-lg">
  <button class="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg text-sm">
    <svg class="w-4 h-4"><!-- download --></svg>
    Download
  </button>
  <button class="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg text-sm">
    <svg class="w-4 h-4"><!-- share --></svg>
    Share
  </button>
  <button class="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg text-sm">
    <svg class="w-4 h-4"><!-- rename --></svg>
    Rename
  </button>
  <div class="w-px h-6 bg-muted mx-1"></div>
  <button class="flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 text-red-600 rounded-lg text-sm">
    <svg class="w-4 h-4"><!-- trash --></svg>
    Delete
  </button>
</div>`,
    props: [],
    preview: FileActionsPreview,
  },
  {
    id: 'search-files',
    name: 'SearchFiles',
    description: 'File search input with filters.',
    usage: `<div class="flex gap-2">
  <div class="flex-1 relative">
    <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"><!-- search --></svg>
    <input type="text" placeholder="Search files..." class="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500" />
  </div>
  <select class="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
    <option>All types</option>
    <option>Documents</option>
    <option>Images</option>
    <option>Videos</option>
  </select>
</div>`,
    props: [
      { name: 'data-filters', type: 'boolean', default: 'true', description: 'Show filter options' },
    ],
    preview: SearchFilesPreview,
  },
  {
    id: 'recent-files',
    name: 'RecentFiles',
    description: 'List of recently accessed files.',
    usage: `<div class="space-y-2">
  <h3 class="font-medium text-sm text-muted-foreground">Recent Files</h3>
  <div class="space-y-1">
    <div class="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 rounded-lg cursor-pointer">
      <svg class="w-5 h-5 text-blue-500"><!-- file --></svg>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">report.docx</p>
        <p class="text-xs text-muted-foreground">Modified 2 hours ago</p>
      </div>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-limit', type: 'number', default: '5', description: 'Number of files to show' },
    ],
    preview: RecentFilesPreview,
  },
  {
    id: 'file-details',
    name: 'FileDetails',
    description: 'Sidebar showing file metadata and properties.',
    usage: `<div class="w-64 border-l border-border p-4 space-y-4">
  <div class="text-center">
    <div class="w-16 h-16 bg-blue-500/20 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
      <svg class="w-8 h-8"><!-- file icon --></svg>
    </div>
    <h3 class="font-semibold mt-3">document.pdf</h3>
    <p class="text-sm text-muted-foreground">2.4 MB</p>
  </div>

  <div class="space-y-3 text-sm">
    <div>
      <p class="text-muted-foreground">Type</p>
      <p class="font-medium">PDF Document</p>
    </div>
    <div>
      <p class="text-muted-foreground">Created</p>
      <p class="font-medium">Jan 10, 2024</p>
    </div>
    <div>
      <p class="text-muted-foreground">Modified</p>
      <p class="font-medium">Jan 12, 2024</p>
    </div>
    <div>
      <p class="text-muted-foreground">Location</p>
      <p class="font-medium truncate">/Documents/Projects</p>
    </div>
  </div>
</div>`,
    props: [],
    preview: FileDetailsPreview,
  },
  {
    id: 'share-dialog',
    name: 'ShareDialog',
    description: 'Dialog for sharing files with others.',
    usage: `<div class="bg-card rounded-xl shadow-xl max-w-md p-6">
  <h2 class="font-semibold text-lg mb-4">Share "document.pdf"</h2>

  <div class="flex gap-2 mb-4">
    <input type="email" placeholder="Add people..." class="flex-1 px-4 py-2 border border-border rounded-lg" />
    <button class="px-4 py-2 bg-coral-500/100 text-white rounded-lg">Share</button>
  </div>

  <div class="space-y-3">
    <h3 class="text-sm font-medium text-muted-foreground">People with access</h3>
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-coral-500/100 text-white rounded-full flex items-center justify-center text-sm">JD</div>
      <div class="flex-1">
        <p class="font-medium text-sm">John Doe</p>
        <p class="text-xs text-muted-foreground">john@example.com</p>
      </div>
      <select class="text-sm border rounded px-2 py-1">
        <option>Can edit</option>
        <option>Can view</option>
      </select>
    </div>
  </div>

  <div class="mt-4 pt-4 border-t border-border">
    <button class="flex items-center gap-2 text-sm text-coral-600 hover:text-coral-500">
      <svg class="w-4 h-4"><!-- link icon --></svg>
      Copy share link
    </button>
  </div>
</div>`,
    props: [],
    preview: ShareDialogPreview,
  },
  {
    id: 'empty-folder',
    name: 'EmptyFolder',
    description: 'Empty state for folders with no files.',
    usage: `<div class="text-center py-12">
  <div class="w-16 h-16 bg-muted text-muted-foreground/70 rounded-full flex items-center justify-center mx-auto">
    <svg class="w-8 h-8"><!-- folder icon --></svg>
  </div>
  <h3 class="font-medium text-foreground mt-4">This folder is empty</h3>
  <p class="text-sm text-muted-foreground mt-1">Upload files or create a new folder to get started</p>
  <div class="flex gap-2 justify-center mt-4">
    <button class="px-4 py-2 bg-coral-500/100 text-white rounded-lg">Upload files</button>
    <button class="px-4 py-2 border border-border rounded-lg">New folder</button>
  </div>
</div>`,
    props: [],
    preview: EmptyFolderPreview,
  },
]

// Preview components
function FileBrowserPreview() {
  return (
    <div className="border rounded-xl overflow-hidden w-full max-w-xl mx-auto">
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <button className="p-1 hover:bg-muted rounded">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Home</span>
          <span className="text-muted-foreground/70">/</span>
          <span className="text-muted-foreground">Documents</span>
          <span className="text-muted-foreground/70">/</span>
          <span className="font-medium">Projects</span>
        </div>
      </div>

      <div className="divide-y divide-border">
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
          </svg>
          <span className="flex-1">Project A</span>
          <span className="text-sm text-muted-foreground">12 items</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
          </svg>
          <span className="flex-1">Project B</span>
          <span className="text-sm text-muted-foreground">8 items</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="flex-1">readme.md</span>
          <span className="text-sm text-muted-foreground">2.4 KB</span>
        </div>
      </div>
    </div>
  )
}

function FileUploadPreview() {
  return (
    <div className="space-y-4 max-w-lg">
      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-coral-400 hover:bg-coral-500/10/50 transition-colors cursor-pointer">
        <svg className="w-12 h-12 text-muted-foreground/70 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="font-medium text-foreground">Drop files here or click to upload</p>
        <p className="text-sm text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
      </div>

      <div className="border-2 border-dashed border-coral-400 bg-coral-500/10 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-coral-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="font-medium text-coral-500">Drop to upload</p>
      </div>
    </div>
  )
}

function UploadProgressPreview() {
  return (
    <div className="space-y-3 max-w-md">
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
        <div className="w-10 h-10 bg-blue-500/20 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm truncate">document.pdf</p>
            <span className="text-xs text-muted-foreground">45%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-coral-500/100 rounded-full transition-all" style={{ width: '45%' }}></div>
          </div>
        </div>
        <button className="p-1 text-muted-foreground/70 hover:text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
        <div className="w-10 h-10 bg-green-500/20 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">image.png</p>
          <p className="text-xs text-green-600">Upload complete</p>
        </div>
      </div>
    </div>
  )
}

function FileCardPreview() {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-lg">
      {['PDF', 'DOC', 'IMG'].map((type, i) => (
        <div key={i} className="border rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
          <div className="aspect-square bg-muted flex items-center justify-center relative">
            <div className={`w-12 h-12 ${i === 0 ? 'bg-red-500/20 text-red-600' : i === 1 ? 'bg-blue-500/20 text-blue-600' : 'bg-green-500/20 text-green-600'} rounded-lg flex items-center justify-center text-xs font-bold`}>
              {type}
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-card rounded-lg">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button className="p-2 bg-card rounded-lg">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-3">
            <p className="font-medium text-sm truncate">file{i + 1}.{type.toLowerCase()}</p>
            <p className="text-xs text-muted-foreground">{(i + 1) * 1.2} MB</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function FolderTreePreview() {
  return (
    <div className="space-y-1 w-full max-w-sm mx-auto">
      <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer">
        <svg className="w-4 h-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
        </svg>
        <span className="text-sm">Documents</span>
      </div>
      <div className="ml-6 space-y-1">
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer">
          <svg className="w-4 h-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
          </svg>
          <span className="text-sm">Projects</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-coral-500/10 rounded cursor-pointer">
          <div className="w-4 h-4"></div>
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm text-coral-600">readme.md</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer">
          <div className="w-4 h-4"></div>
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm">notes.txt</span>
        </div>
      </div>
    </div>
  )
}

function FilePreviewPreview() {
  return (
    <div className="border rounded-xl overflow-hidden w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/>
          </svg>
          <span className="font-medium">document.pdf</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 hover:bg-muted rounded">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="aspect-[4/3] bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground/70">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
          <p className="mt-2">PDF Preview</p>
        </div>
      </div>
    </div>
  )
}

function StorageMeterPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center justify-between">
        <span className="font-medium">Storage</span>
        <span className="text-sm text-muted-foreground">8.2 GB of 15 GB used</span>
      </div>

      <div className="h-3 bg-muted rounded-full overflow-hidden flex">
        <div className="h-full bg-blue-500" style={{ width: '30%' }}></div>
        <div className="h-full bg-green-500/100" style={{ width: '15%' }}></div>
        <div className="h-full bg-amber-500" style={{ width: '10%' }}></div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded"></span>
          <span>Documents (4.5 GB)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500/100 rounded"></span>
          <span>Images (2.2 GB)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500 rounded"></span>
          <span>Videos (1.5 GB)</span>
        </div>
      </div>
    </div>
  )
}

function FileTypeIconPreview() {
  const types = [
    { ext: 'PDF', color: 'bg-red-500/20 text-red-600' },
    { ext: 'DOC', color: 'bg-blue-500/20 text-blue-600' },
    { ext: 'XLS', color: 'bg-green-500/20 text-green-600' },
    { ext: 'PPT', color: 'bg-orange-500/20 text-orange-600' },
    { ext: 'ZIP', color: 'bg-purple-500/20 text-purple-600' },
    { ext: 'JPG', color: 'bg-pink-500/20 text-pink-600' },
    { ext: 'MP4', color: 'bg-indigo-500/20 text-indigo-600' },
    { ext: 'MP3', color: 'bg-cyan-500/20 text-cyan-600' },
  ]
  return (
    <div className="flex flex-wrap gap-4">
      {types.map((t, i) => (
        <div key={i} className={`w-12 h-12 ${t.color} rounded-lg flex items-center justify-center`}>
          <span className="text-xs font-bold">{t.ext}</span>
        </div>
      ))}
    </div>
  )
}

function BreadcrumbPathPreview() {
  return (
    <div className="flex items-center gap-1 text-sm overflow-x-auto max-w-lg">
      <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
      <svg className="w-4 h-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <button className="px-2 py-1 hover:bg-muted rounded text-muted-foreground">Documents</button>
      <svg className="w-4 h-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <button className="px-2 py-1 hover:bg-muted rounded text-muted-foreground">Projects</button>
      <svg className="w-4 h-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="px-2 py-1 font-medium">Current Folder</span>
    </div>
  )
}

function FileActionsPreview() {
  return (
    <div className="flex items-center gap-1 p-2 bg-muted/50 rounded-lg max-w-max">
      <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download
      </button>
      <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Rename
      </button>
      <div className="w-px h-6 bg-muted mx-1"></div>
      <button className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 text-red-600 rounded-lg text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  )
}

function SearchFilesPreview() {
  return (
    <div className="flex gap-2 max-w-lg">
      <div className="flex-1 relative">
        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search files..." className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500" />
      </div>
      <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
        <option>All types</option>
        <option>Documents</option>
        <option>Images</option>
        <option>Videos</option>
      </select>
    </div>
  )
}

function RecentFilesPreview() {
  const files = [
    { name: 'report.docx', time: '2 hours ago' },
    { name: 'presentation.pptx', time: '5 hours ago' },
    { name: 'budget.xlsx', time: 'Yesterday' },
  ]
  return (
    <div className="space-y-2 w-full max-w-sm mx-auto">
      <h3 className="font-medium text-sm text-muted-foreground">Recent Files</h3>
      <div className="space-y-1">
        {files.map((file, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 rounded-lg cursor-pointer">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">Modified {file.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FileDetailsPreview() {
  return (
    <div className="w-full max-w-xs mx-auto border border-border rounded-xl p-4 space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500/20 text-red-600 rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
          PDF
        </div>
        <h3 className="font-semibold mt-3">document.pdf</h3>
        <p className="text-sm text-muted-foreground">2.4 MB</p>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Type</p>
          <p className="font-medium">PDF Document</p>
        </div>
        <div>
          <p className="text-muted-foreground">Created</p>
          <p className="font-medium">Jan 10, 2024</p>
        </div>
        <div>
          <p className="text-muted-foreground">Modified</p>
          <p className="font-medium">Jan 12, 2024</p>
        </div>
        <div>
          <p className="text-muted-foreground">Location</p>
          <p className="font-medium truncate">/Documents/Projects</p>
        </div>
      </div>
    </div>
  )
}

function ShareDialogPreview() {
  return (
    <div className="bg-card rounded-xl shadow-xl max-w-md p-6 border">
      <h2 className="font-semibold text-lg mb-4">Share "document.pdf"</h2>

      <div className="flex gap-2 mb-4">
        <input type="email" placeholder="Add people..." className="flex-1 px-4 py-2 border border-border rounded-lg text-sm" />
        <button className="px-4 py-2 bg-coral-500/100 text-white rounded-lg text-sm">Share</button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">People with access</h3>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-coral-500/100 text-white rounded-full flex items-center justify-center text-sm font-medium">JD</div>
          <div className="flex-1">
            <p className="font-medium text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
          <select className="text-sm border rounded px-2 py-1">
            <option>Can edit</option>
            <option>Can view</option>
          </select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="flex items-center gap-2 text-sm text-coral-600 hover:text-coral-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Copy share link
        </button>
      </div>
    </div>
  )
}

function EmptyFolderPreview() {
  return (
    <div className="text-center py-12 max-w-sm mx-auto">
      <div className="w-16 h-16 bg-muted text-muted-foreground/70 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
        </svg>
      </div>
      <h3 className="font-medium text-foreground mt-4">This folder is empty</h3>
      <p className="text-sm text-muted-foreground mt-1">Upload files or create a new folder to get started</p>
      <div className="flex gap-2 justify-center mt-4">
        <button className="px-4 py-2 bg-coral-500/100 text-white rounded-lg text-sm">Upload files</button>
        <button className="px-4 py-2 border border-border rounded-lg text-sm">New folder</button>
      </div>
    </div>
  )
}

export default function FilesPage() {
  return (
    <ComponentPageLayout
      categoryName="File Management"
      categoryId="files"
      components={filesComponents}
    />
  )
}
