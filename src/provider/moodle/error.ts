// Based on https://github.com/moodlehq/moodleapp/blob/main/src/core/classes/errors/wserror.ts

/**
 * Error returned by WS.
 */
export class CoreWSError extends Error {
  /** Name of the Moodle exception. */
  exception?: string;
  errorcode?: string;
  warningcode?: string;
  /** Link to the site. */
  link?: string;
  /** Link to a page with more info. */
  moreinfourl?: string;
  /** Debug info. Only if debug mode is enabled. */
  debuginfo?: string;
  /** Backtrace. Only if debug mode is enabled. */
  backtrace?: string;

  constructor(error: CoreWSErrorData) {
    super(error.message);

    this.exception = error.exception;
    this.errorcode = error.errorcode;
    this.warningcode = error.warningcode;
    this.link = error.link;
    this.moreinfourl = error.moreinfourl;
    this.debuginfo = error.debuginfo;
    this.backtrace = error.backtrace;
  }
}

type CoreWSErrorData = {
  message?: string;
  /** Name of the Moodle exception. */
  exception?: string;
  errorcode?: string;
  warningcode?: string;
  /** Link to the site. */
  link?: string;
  /** Link to a page with more info. */
  moreinfourl?: string;
  /** Debug info. Only if debug mode is enabled. */
  debuginfo?: string;
  /** Backtrace. Only if debug mode is enabled. */
  backtrace?: string;
};
