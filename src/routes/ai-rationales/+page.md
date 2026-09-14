<script>
import { PUBLIC_APP_NAME } from '$env/static/public';
import PageTitle from '../../components/layout/PageTitle.svelte';
</script>

<svelte:head>

<title>How AI Rationales Are Written | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>How AI Rationales Are Written</PageTitle>

Some card pages include a short paragraph explaining why a card was banned or restricted. Where
you see a note at the bottom of that paragraph, it means an AI language model helped write the
first draft. This page explains, in plain terms, how that works.

## Where the information comes from

The AI is never asked to explain a card from general knowledge of the game, and it isn't connected
to the internet while it works. It only reads the official banned and restricted announcements
archived on this site that are relevant to that specific card, and is asked to summarize what
those announcements actually say. If a card was never explicitly named but belonged to a group
that was banned together, the announcement covering that group is what gets used.

In other words, the AI is acting as a summarizer of source material you could read yourself, not
as an independent authority on Magic history.

## How we steer the AI

Language models tend to ramble, hedge, or make things up when given loose instructions, so the
AI is given a strict, narrow set of rules for every card:

- Only use the announcements provided for this card. Don't bring in outside knowledge.
- Stay focused on the named card. Other cards are mentioned only if they directly affected its
  status.
- Write one plain paragraph, in a neutral, encyclopedic tone. No filler, no hedging, no phrases
  like "this summary" or "here is."
- If the announcements don't clearly explain the reasoning, say so rather than guessing.

The goal is a consistent, factual paragraph that reads like the rest of the site, not something
that sounds like it came from a chatbot.

## Human review

An AI-written paragraph is a draft, not a final word. A human editor reads it, checks it against
the source announcements, and either approves it as-is or rewrites it. The note under the
paragraph always tells you which model wrote the draft, when it was last updated, and whether it
has been reviewed and approved yet.

## Questions or corrections

If a rationale looks wrong or missing context, please [reach out](/contact) and it will be
looked into.
