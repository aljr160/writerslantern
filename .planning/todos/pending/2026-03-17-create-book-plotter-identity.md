---
created: 2026-03-17T23:22:29.604Z
title: Create Book Plotter identity
owner: Book Plotter
area: general
files: []
---

## Problem

Discord channel <#1483551942562283663> is supposed to host the Book Plotter agent, but it still introduces itself as Inkkeeper because the workspace only has the Inkkeeper identity. This confuses users when other agents (e.g., Song Plotter / Dennis) show unique names.

## Solution

Create a dedicated identity/persona file for Book Plotter (name, avatar, SOUL/AGENT docs), then update the channel mapping so messages originate from the new identity instead of Inkkeeper. Verify the introduction text reflects the new name and that Discord shows the correct bot label.
