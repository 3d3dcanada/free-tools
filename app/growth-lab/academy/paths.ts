/**
 * The course's fixed paths, with no lesson in them (2026-11-11). Pages and forms that only need
 * a link import this, so the forty lessons stay on the server (view.ts sends what a page draws).
 */
export const COURSE_VERSION = 1;
export const ACADEMY_PATH = "/learn/academy";
export const lessonPath = (lesson: { slug: string }) => `${ACADEMY_PATH}/${lesson.slug}`;
