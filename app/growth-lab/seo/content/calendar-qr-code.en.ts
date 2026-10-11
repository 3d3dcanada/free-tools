import type { ToolGuide } from "../guide";
export default {
  slug: "calendar-qr-code",
  locale: "en",
  name: "Free Calendar Event QR Generator",
  headline: "Put the date in their calendar.",
  description:
    "Encode an event as a static iCalendar QR. Set the title, local start and end, and location. Free local SVG, PNG and PDF exports with scan checks.",
  answer:
    "Create a free calendar QR code containing an iCalendar event with a title, start, end and location. Nothing is uploaded or hosted. Times use the event’s local clock, without an embedded time zone. Scan the result and verify the imported calendar time before sharing it with attendees.",
  steps: [
    "Name the event and enter its location. Use the local clock time at the venue and state the time zone in the description, especially for remote attendees.",
    "Set the local start and end in the editor. Review the encoded VEVENT and resolve any validation or scan error before downloading.",
    "Import a scan into a test calendar and verify its local display. Keep a readable date, time zone and venue beside the QR on the invitation.",
  ],
  faqs: [
    {
      q: "Does this code send an invitation or reminder?",
      a: "No. It stores an event record. Importing and setting reminders are actions performed by the recipient’s calendar app.",
    },
    {
      q: "Does this convert time zones automatically?",
      a: "No. This event uses floating local times without a time-zone identifier. For an event across time zones, use a proper calendar invitation and verify the displayed time with every audience.",
    },
    {
      q: "Can an event code update after a venue changes?",
      a: "The printed payload cannot change. Issue an updated invitation and explain the change; this is not a subscribed calendar feed.",
    },
    {
      q: "Does the code create a recurring event?",
      a: "This editor creates one event with a start and end. Recurrence rules and calendar subscriptions are outside this workflow; use a calendar application for those cases.",
    },
    {
      q: "Why can’t I export an event ending before it starts?",
      a: "The editor requires a positive time span and valid dates. Correct the end date when an event passes midnight rather than entering an earlier time on the same day.",
    },
    {
      q: "Will every scanner offer to add the event?",
      a: "No. The exported iCalendar payload is real, but scanner and calendar integrations vary. Test the actual receiving apps and keep the essential event details readable beside the QR.",
    },
  ],
  title: "Free Calendar Event QR Code Generator | 3D3D",
  summary: "Encode a local event record and verify the imported calendar time.",
  sections: [
    {
      heading: "Keep the invitation understandable without a scan",
      paragraphs: [
        "An event QR can reduce retyping when an attendee wants to save a workshop or meeting. It should supplement a readable invitation rather than replace the event’s name, date, time and venue. Someone looking at a printed notice needs enough information to decide whether the event is relevant before opening a camera. Include an ordinary contact or information link for questions and last-minute changes.",
        "Use a title that will still make sense several weeks later in a crowded calendar. A generic label such as Meeting is less useful than the activity and host. Put the venue in the location field and use the description for a short preparation note or contact. Review the content as the recipient will encounter it, rather than assuming the surrounding poster travels into the calendar with the code.",
      ],
    },
    {
      heading: "Understand the local-time limitation",
      paragraphs: [
        "This editor writes floating local calendar times: the event has a clock reading but no embedded time-zone identifier. That is a deliberate limitation to make visible, especially when a meeting includes remote attendees. Write the intended zone in the readable invitation and description, then test the import. For an event that must resolve automatically across zones or daylight-saving boundaries, use a calendar service that creates a proper zoned invitation.",
        "Choose real dates and an end after the start. The editor rejects impossible calendar dates instead of allowing a date parser to silently roll them into the following month. That check prevents one class of error; it does not confirm that the chosen day is the one the organiser intended. Compare the exported start and end with the original event record and the final printed wording.",
      ],
    },
    {
      heading: "Plan for revisions and different calendar apps",
      paragraphs: [
        "A static QR contains one event record. It is not a subscribed calendar and cannot send a cancellation, change a venue or add a reminder after someone scans it. If the schedule changes, explain the revision through your normal communication channel and replace the affected invitation. Keep the old and new drafts labelled internally so that an outdated sign does not return to circulation.",
        "Scanner and calendar applications do not all offer the same import flow. Some may show the payload, while others offer to add an event. Test the full path on the devices you expect attendees to use: scan, open the preview, save and check the resulting entry. Confirm the title, local clock time, duration and location. A successful QR decode alone establishes none of those application-level behaviors.",
      ],
    },
  ],
  comparison: [
    {
      name: "QRCode Monkey",
      detail: "Static event codes among its supported content choices.",
      url: "https://www.qrcode-monkey.com/",
    },
  ],
  service: {
    label: "Make an event sign with 3D3D",
    path: "/quote",
  },
} satisfies ToolGuide;
