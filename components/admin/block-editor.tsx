"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Type, ImageIcon, Code, List, Quote, LinkIcon, Minus, X } from "lucide-react"
import type { ContentBlock } from "@/types/project"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface BlockEditorProps {
  content: ContentBlock[]
  onChange: (content: ContentBlock[]) => void
}

export function BlockEditor({ content, onChange }: BlockEditorProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const generateId = () => `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const addBlock = useCallback(
    (type: ContentBlock["type"]) => {
      const newBlock: ContentBlock = {
        id: generateId(),
        type,
        content:
          type === "paragraph"
            ? ""
            : type === "heading"
              ? ""
              : type === "image"
                ? { url: "", alt: "", caption: "" }
                : type === "code"
                  ? ""
                  : type === "list"
                    ? []
                    : type === "quote"
                      ? ""
                      : type === "link"
                        ? { url: "", title: "", description: "" }
                        : undefined,
        ...(type === "heading" && { level: 2 as const }),
        ...(type === "list" && { listType: "bullet" as const }),
        ...(type === "code" && { language: "javascript" }),
      } as ContentBlock

      onChange([...content, newBlock])
    },
    [content, onChange],
  )

  const updateBlock = useCallback(
    (id: string, updates: Partial<ContentBlock>) => {
      onChange(content.map((block) => (block.id === id ? { ...block, ...updates } : block)))
    },
    [content, onChange],
  )

  const deleteBlock = useCallback(
    (id: string) => {
      onChange(content.filter((block) => block.id !== id))
    },
    [content, onChange],
  )

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const items = Array.from(content)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      onChange(items)
      setDraggedItem(null)
    },
    [content, onChange],
  )

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Write your paragraph..."
            className="bg-neutral-800/50 border-neutral-600 text-white min-h-[100px]"
          />
        )

      case "heading":
        return (
          <div className="space-y-3">
            <div className="flex gap-3">
              <Select
                value={block.level.toString()}
                onValueChange={(value) =>
                  updateBlock(block.id, { level: Number.parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 })
                }
              >
                <SelectTrigger className="w-24 bg-neutral-800/50 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      H{level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Heading text..."
                className="flex-1 bg-neutral-800/50 border-neutral-600 text-white"
              />
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-3">
            <Input
              value={block.content.url}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, url: e.target.value },
                })
              }
              placeholder="Image URL..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
            <Input
              value={block.content.alt}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, alt: e.target.value },
                })
              }
              placeholder="Alt text..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
            <Input
              value={block.content.caption || ""}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, caption: e.target.value },
                })
              }
              placeholder="Caption (optional)..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
            {block.content.url && (
              <div className="mt-3">
                <img
                  src={block.content.url || "/placeholder.svg"}
                  alt={block.content.alt}
                  className="max-w-full h-auto rounded-lg border border-neutral-700"
                />
              </div>
            )}
          </div>
        )

      case "code":
        return (
          <div className="space-y-3">
            <div className="flex gap-3">
              <Select
                value={block.language || "javascript"}
                onValueChange={(value) => updateBlock(block.id, { language: value })}
              >
                <SelectTrigger className="w-32 bg-neutral-800/50 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={block.filename || ""}
                onChange={(e) => updateBlock(block.id, { filename: e.target.value })}
                placeholder="Filename (optional)..."
                className="flex-1 bg-neutral-800/50 border-neutral-600 text-white"
              />
            </div>
            <Textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Your code here..."
              className="bg-neutral-800/50 border-neutral-600 text-white font-mono text-sm min-h-[150px]"
            />
          </div>
        )

      case "list":
        return (
          <div className="space-y-3">
            <Select
              value={block.listType}
              onValueChange={(value: "bullet" | "numbered") => updateBlock(block.id, { listType: value })}
            >
              <SelectTrigger className="w-32 bg-neutral-800/50 border-neutral-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bullet">Bullet</SelectItem>
                <SelectItem value="numbered">Numbered</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-2">
              {block.content.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newContent = [...block.content]
                      newContent[itemIndex] = e.target.value
                      updateBlock(block.id, { content: newContent })
                    }}
                    placeholder={`Item ${itemIndex + 1}...`}
                    className="flex-1 bg-neutral-800/50 border-neutral-600 text-white"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newContent = block.content.filter((_, i) => i !== itemIndex)
                      updateBlock(block.id, { content: newContent })
                    }}
                    className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-red-600/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => updateBlock(block.id, { content: [...block.content, ""] })}
                className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        )

      case "quote":
        return (
          <div className="space-y-3">
            <Textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Quote text..."
              className="bg-neutral-800/50 border-neutral-600 text-white min-h-[100px]"
            />
            <Input
              value={block.author || ""}
              onChange={(e) => updateBlock(block.id, { author: e.target.value })}
              placeholder="Author (optional)..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
          </div>
        )

      case "link":
        return (
          <div className="space-y-3">
            <Input
              value={block.content.url}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, url: e.target.value },
                })
              }
              placeholder="URL..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
            <Input
              value={block.content.title}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, title: e.target.value },
                })
              }
              placeholder="Link title..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
            <Input
              value={block.content.description || ""}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, description: e.target.value },
                })
              }
              placeholder="Description (optional)..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
            <Input
              value={block.content.image || ""}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, image: e.target.value },
                })
              }
              placeholder="Preview image URL (optional)..."
              className="bg-neutral-800/50 border-neutral-600 text-white"
            />
          </div>
        )

      case "divider":
        return (
          <div className="text-center py-4">
            <div className="border-t border-neutral-600"></div>
            <span className="text-neutral-400 text-sm mt-2 block">Divider</span>
          </div>
        )

      default:
        return null
    }
  }

  const blockTypeIcons = {
    paragraph: Type,
    heading: Type,
    image: ImageIcon,
    code: Code,
    list: List,
    quote: Quote,
    link: LinkIcon,
    divider: Minus,
  }

  const blockTypeLabels = {
    paragraph: "Paragraph",
    heading: "Heading",
    image: "Image",
    code: "Code",
    list: "List",
    quote: "Quote",
    link: "Link",
    divider: "Divider",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Content Blocks</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(blockTypeIcons).map(([type, Icon]) => (
            <Button
              key={type}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addBlock(type as ContentBlock["type"])}
              className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50"
            >
              <Icon className="h-4 w-4 mr-1" />
              {blockTypeLabels[type as keyof typeof blockTypeLabels]}
            </Button>
          ))}
        </div>
      </div>

      {content.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-700 rounded-lg">
          <p className="text-neutral-400 mb-4">No content blocks yet</p>
          <p className="text-neutral-500 text-sm">Add your first block using the buttons above</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {content.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-neutral-900/50 border-neutral-700 transition-all ${
                          snapshot.isDragging ? "shadow-lg scale-105" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div {...provided.dragHandleProps} className="flex flex-col items-center gap-2 pt-2">
                              <GripVertical className="h-4 w-4 text-neutral-400 cursor-grab" />
                              <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1">
                                {blockTypeLabels[block.type as keyof typeof blockTypeLabels]}
                              </Badge>
                            </div>

                            <div className="flex-1">{renderBlockEditor(block, index)}</div>

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => deleteBlock(block.id)}
                              className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-red-600/20 mt-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
