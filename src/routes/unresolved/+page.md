<script>
import { PUBLIC_APP_NAME } from '$env/static/public';
import PageTitle from '../../components/layout/PageTitle.svelte';
</script>

<svelte:head>
<title>How You Can Help | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>Help Wanted</PageTitle>

The data on this website is incomplete! There are a number of bannings that are missing a proper source. If you have any
additional information on the announcements listed below, please [reach out](/contact#correction).

- Much of early MTG history appear to be lost. Many of the early bannings are pieced together from
  an [archived card rules document from 2000](https://web.archive.org/web/20001212180600/http://www.activesw.com/~sdangelo/magic/rule-cards.html).
  Still looking for records of the following announcements (likely just rulebook updates):
    - [MTR Update 2/23/1994](/announcements#announcement_2)
    - [MTR Update 3/23/1994](/announcements#announcement_3)
    - [MTR Update 5/1/1994](/announcements#announcement_4)
    - [MTR Update 5/2/1994](/announcements#announcement_5)
    - [MTR Update 6/13/1994](/announcements#announcement_6)
    - [MTR Update 10/10/1994](/announcements#announcement_9)
    - [MTR Update 11/1/1995](/announcements#announcement_13)
    - [MTR Update 2/1/1996](/announcements#announcement_14)
    - [MTR Update 4/1/1996](/announcements#announcement_15)
    - [MTR Update 10/1/1997](/announcements#announcement_22)
    - [MTR Update 1/1/1998](/announcements#announcement_23)
    - [MTR Update 7/1/1998](/announcements#announcement_24)
    - [MTR Update 7/1/1999](/announcements#announcement_28)
    - [MTR Update 8/1/1999](/announcements#announcement_29)
- Several B&R Announcements from 2017 to 2019 are missing from the official Magic website, and their respective Wayback Machine entries do not capture the main body of the articles. Third-party sources have been used in their place.
  - [January 9, 2017 Banned and Restricted Announcement](/announcements#announcement_101)
  - [Addendum to April 24, 2017, Banned and Restricted Announcement](/announcements#announcement_104)
  - [June 13, 2017 Banned and Restricted Announcement](/announcements#announcement_105)
  - [August 28, 2017 Banned and Restricted Announcement](/announcements#announcement_106)
  - [January 15, 2018 Banned and Restricted Announcement](/announcements#announcement_107)
  - [February 12, 2018 Banned and Restricted Announcement](/announcements#announcement_108)
  - [July 8, 2019, Banned and Restricted Announcement](/announcements#announcement_114)
- Most of the early commander bannings are sourced
  from [Mewens' thread on the MTG Salvation Forums](https://www.mtgsalvation.com/forums/the-game/commander-edh/204244-edh-banlist-timeline).
  However, some of the sources listed in this thread no longer reflect the information provided.
    - The thread cites an update to the DreamWizards EDH rules
      page [in February 2006 which bans several cards as commander](/announcements#announcement_51);
      however, [the page as archived by Wayback Machine](https://web.archive.org/web/20060212175040/http://www.dreamwizards.com:80/edh.html)
      doesn't reflect this update
      until [June 2006](https://web.archive.org/web/20060613021744/http://www.dreamwizards.com:80/edh.html).
        - Additionally, [Smileylich](https://smileylich.com/mtg/magocracy/Magocracy_G3.html) and
          the [MTG Wiki](https://mtg.fandom.com/wiki/Banned_and_restricted_cards/Timeline#February_3) both listed
          Kaervek as also getting banned around this time, but neither DW or Meven reflects this. Meven's thread even
          listed an unbanning post for it with the comment that there are no records of it being banned.
    - The [May 2006 banning of Yawgmoth's Bargain](/announcements#announcement_52) was listed as an unofficial
      announcement in the Rules Discussion topic of the now defunct MTG Commander forums. I was not able to find an
      archive of this thread on the Wayback Machine.
    - Shahrazad was reportedly exempt from the shared banlist with vintage, with the exemption removed on
      the [09/2011 announcement](https://web.archive.org/web/20111228040311/http://mtgcommander.net/Forum/viewtopic.php?f=1&t=10749);
      however, all records I have suggested that it was already banned by then. Notably, it was explicitly added to the
      banlist while the list was maintained
      on [DreamWizards](https://web.archive.org/web/20051217105153/http://www.dreamwizards.com:80/edh.html). It would
      have been unbanned in Vintage during this
      time ([10/1/1999](/announcements#announcement_30) - [9/20/2007](/announcements#announcement_56)).
- The [Wikia Banlist Timeline](https://mtg.fandom.com/wiki/Banned_and_restricted_cards/Timeline#October_3) lists Hymn to Tourach as being banned in Legacy, but I'm unable to confirm this. There's no record of Hymn ever getting unbanned and as of December 2024, and it is not currently banned, so I am assuming this was a mistake.
- Some categories of cards are blanket-banned, such as ante cards and Conspiracy cards. Future releases of such cards may have been missed after their initial banning. Some examples I came across are when new antes cards were released after they were banned in 1994 and when Conspiracy: Take the Crown introduced a new batch of Conpiracy cards. There may be other cases I'm missing.
- Mana Crypt's status within Extended is somewhat unclear. It was explicitly banned at the format's inception, but was never printed in a set that was legal in the format and thus never "rotated". [As of 2008](https://web.archive.org/web/20081106201424/http://www.wizards.com/Magic/TCG/Resources.aspx?x=judge/resources/sfrextended), it was not explicitly listed in the format's banlist.
- It's unclear when Commander / EDH first adopted the "Elder Dragon Highlander" name but it has had that name since the first banlist, so that's what I used as the turning point. It's likely that it's been called that for longer.

## Missing Formats

- Oathbreaker is currently not supported, but I have plans to add it. Any help to gather resources in advance would be
  appreciated.
- Block constructed is not supported due to technical limitations. There are currently no plans on supporting this
  format.
- "Joke" (e.g. silver-bordered and acorn-stamped cards) are not included in any capacity, including when they were legal in Commander from December 1, 2017 to January 15, 2018.
  - This excludes cards from Unfinity without the acorn stamp.
- Digital-only formats, including on MTG Arena are not supported.
    - Pauper is an exception; it was eventually sanctioned in paper, but the banlist for the format is maintained from
      its time as an MTGO-exclusive format.
- Brawl doesn't exist.