import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

export const create = mutation({
  args: { parentDocument: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const existingDocument = await ctx.db.get(args.parentDocument)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    const stickynote = await ctx.db.insert("stickynotes", {
      parentDocument: args.parentDocument,
      isSticky: false,
    })

    return stickynote
  },
})

export const getStickyNotes = query({
  args: { parentDocument: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const existingDocument = await ctx.db.get(args.parentDocument)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    const stickynotes = await ctx.db
      .query("stickynotes")
      .withIndex("by_docs", (q) => q.eq("parentDocument", args.parentDocument))
      .order("desc")
      .collect()

    // const sorted_stickynotes = stickynotes.sort((a, b) => Number(b.isSticky) - Number(a.isSticky));

    return stickynotes
  },
})

export const update = mutation({
  args: {
    id: v.id("stickynotes"),
    content: v.optional(v.string()),
    isSticky: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const { id, ...rest } = args

    const existingNote = await ctx.db.get(args.id)

    if (!existingNote) {
      throw new Error("Not found")
    }

    const stickynote = await ctx.db.patch(args.id, { ...rest })

    return stickynote
  },
})

export const remove = mutation({
  args: { id: v.id("stickynotes") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const existingNote = await ctx.db.get(args.id)

    if (!existingNote) {
      throw new Error("Not found")
    }

    const stickynote = await ctx.db.delete(args.id)

    return stickynote
  },
})
