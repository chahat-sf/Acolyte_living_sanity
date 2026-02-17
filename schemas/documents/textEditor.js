import { BiTable } from "react-icons/bi";
import { BsQuote, BsYoutube } from "react-icons/bs";
import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import { ImImage, ImTextColor } from "react-icons/im";
import { defineType } from "sanity";
import { TextAlign } from "./TextAlign";
import { TextColor } from "./TextColor";

export default defineType({
  name: "textEditor",
  title: "Text Editor",
  type: "array",

  of: [
    /* ================= BLOCK TEXT ================= */

    {
      type: "block",
      title: "Text",

      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          {
            title: "Left",
            value: "left",
            icon: CiTextAlignLeft,
            component: (props) => TextAlign(props),
          },
          {
            title: "Center",
            value: "center",
            icon: CiTextAlignCenter,
            component: (props) => TextAlign(props),
          },
          {
            title: "Justify",
            value: "justify",
            icon: CiTextAlignJustify,
            component: (props) => TextAlign(props),
          },
          {
            title: "Right",
            value: "right",
            icon: CiTextAlignRight,
            component: (props) => TextAlign(props),
          },
        ],

        annotations: [
          {
            name: "textColor",
            title: "Text Color",
            type: "textColor",
            icon: ImTextColor,
            component: (props) => TextColor(props),
          },

          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "externalLink",
                type: "url",
                title: "External Link",
              },
              {
                name: "internalLink",
                type: "reference",
                title: "Internal Link",
                to: [{ type: "blog" }],
              },
            ],
          },
        ],
      },
    },

    /* ================= IMAGE ================= */

    {
      type: "image",
      title: "Image",
      icon: ImImage,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
        {
          name: "customWidth",
          type: "number",
          title: "Image Width (%)",
          initialValue: 100,
          validation: (Rule) => Rule.min(10).max(100),
        },
        {
          name: "alignment",
          type: "string",
          title: "Alignment",
          initialValue: "center",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
        },
      ],
    },

    /* ================= TABLE ================= */

    {
      type: "object",
      name: "table",
      title: "Table",
      icon: BiTable,
      fields: [
        {
          name: "rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "cells",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "text", type: "string" },
                        { name: "bold", type: "boolean" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================= VIDEO ================= */

    {
      type: "object",
      name: "video",
      title: "YouTube Video",
      icon: BsYoutube,
      fields: [
        {
          name: "url",
          type: "url",
          title: "YouTube URL",
        },
      ],
    },

    /* ================= QUOTE ================= */

    {
      type: "object",
      name: "quote",
      title: "Quote",
      icon: BsQuote,
      fields: [
        { name: "text", type: "text" },
        { name: "author", type: "string" },
      ],
    },

    /* ================= EXTERNAL LINK ================= */

    {
      type: "object",
      name: "externalLinkBlock",
      title: "External Link Button",
      icon: FiExternalLink,
      fields: [
        { name: "label", type: "string" },
        { name: "url", type: "url" },
      ],
    },
  ],
});
