

export class Releases {

  releases: number[][] = [[]];

  constructor() {
  }

  releasesForDay(day: number) {
    if (this.releases[day] != undefined) {
      return this.releases[day][0];
    } else {
      return 0;
    }
  }

  deceasedForDay(day: number) {
    if (this.releases[day] != undefined) {
      return this.releases[day][1];
    } else {
      return 0;
    }
  }

  totalReleasesForDay(day: number) {
    if (this.releases[day] != undefined) {
      return this.releasesForDay(day) + this.deceasedForDay(day);
    } else {
      return 0;
    }
  }

  maybe(what: number[], where): number {
    return what ? what[where] : 0;
  }

  updateReleasesForDay(day: number, expectedReleases: number, ofWhichDeceased: number) {
    if (expectedReleases < 0 || ofWhichDeceased < 0) {
      return;
    }
    this.releases[day] = [this.maybe(this.releases[day], 0) + expectedReleases,
      this.maybe(this.releases[day], 1) + (expectedReleases * ofWhichDeceased)];
  }
}
