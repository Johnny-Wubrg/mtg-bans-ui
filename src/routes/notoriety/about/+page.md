<script>
import { PUBLIC_APP_NAME } from '$env/static/public';
import PageTitle from '../../../components/layout/PageTitle.svelte';
</script>

<svelte:head>

<title>About the Notoriety Index | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>About the Notoriety Index</PageTitle>

The Notoriety Index is our attempt to rank the most infamous cards in Magic's Banned and Restricted
history. Each card is scored based on a variety of factors.

- **How many formats it's been banned or restricted in.** A card that's caused problems across
  several formats at once is treated as more notorious than one that only ever caused trouble in a
  single format.
- **The power level of the format(s) involved.** A ban in a wide-open, high-powered format like
  Vintage or Legacy says more about a card's raw strength than a ban in a smaller, more restrictive
  format like Standard.
- **Whether it's still banned or was later reinstated.** A card that remains banned carries more
  weight than one that was banned and later unbanned — a reversed ban suggests the original concern
  mattered less over time.
- **How quickly it was banned after release.** A card that gets banned within its first few months
  is treated as slightly more notorious than one that took years to become a problem.
- **How long it's spent on the banlist.** A card that's been banned for a long stretch of time is
  treated as slightly more notorious than one banned only briefly.
- **Whether it was banned on its own merit, or caught in a broad, mechanic-wide sweep.**
  Sometimes a whole category of cards gets banned together for reasons that have nothing to do with
  any one card's individual power. Cards banned this way are treated as less notorious than cards
  singled out on their own merits, and the penalty varies with the reason for the sweep:
  - Mechanics that cause legitimate logistical concerns like stickers, attractions, and manual
    dexterity requirements get a smaller penalty since similar cards could feasibly be printed today
    and individually get banned.
  - Deliberate policy decisions like the 1994 Legend rule restriction or the ante mechanic are
    weighted less heavily, since they reflect a change in the direction of the game rather than any
    one card being too strong. Similarly, Conspiracy cards were banned purely because they were
    never intended to be playted in constructed formats to begin with, and receive the same weight.
  - Cards banned for depicting racially or culturally insensitive material are excluded
    from the index entirely. Including them would run counter to why they were banned in the
    first place.

This index is meant to be a fun, evolving way to explore ban history, not a precise scientific 
ranking.

[See the current top 100](/notoriety)
