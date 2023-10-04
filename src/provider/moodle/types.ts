// Regular expression to convert comments to documentation:
// Look for: (\w+\??: \w+;) // (.+)
// Replace with: /** $2 */\n$1
// Or with: /**\n * $2\n **/\n$1

/**
 * Structure of warnings returned by WS.
 */
export type CoreWSExternalWarning = {
  /** Item. */
  item?: string;
  /** Item id. */
  itemid?: number;
  /** The warning code can be used by the client app to implement specific behaviour. */
  warningcode: string;
  /** Untranslated english message to explain the warning. */
  message: string;
};

/**
 * Enum constants that define default user home page.
 */
export enum CoreSiteInfoUserHomepage {
  /** Site home. */
  HOMEPAGE_SITE = 0,
  /** Dashboard. */
  HOMEPAGE_MY = 1,
  /** My courses. */
  HOMEPAGE_MYCOURSES = 3,
}

/**
 * Constants to get either read, unread or both notifications.
 */
export enum AddonNotificationsGetReadType {
  UNREAD = 0,
  READ = 1,
  BOTH = 2,
}

/**
 * Params of core_message_get_messages WS.
 */
export type AddonNotificationsGetMessagesWSParams = {
  /** The user id who received the message, 0 for any user. */
  useridto: number;
  /** The user id who send the message, 0 for any user. -10 or -20 for no-reply or support user. */
  useridfrom?: number;
  /** Type of message to return, expected values are: notifications, conversations and both. */
  type?: 'notifications' | 'conversations' | 'both';
  /** 0=unread, 1=read. @since 4.0 it also accepts 2=both. */
  read?: AddonNotificationsGetReadType;
  /** True for ordering by newest first, false for oldest first. */
  newestfirst?: boolean;
  /** Limit from. */
  limitfrom?: number;
  /** Limit number. */
  limitnum?: number;
};

/**
 * Message data returned by core_message_get_messages.
 */
export type AddonNotificationsNotificationMessage = {
  /** Message id. */
  id: number;
  /** User from id. */
  useridfrom: number;
  /** User to id. */
  useridto: number;
  /** The message subject. */
  subject: string;
  /** The message text formated. */
  text: string;
  /** The message. */
  fullmessage: string;
  /** Fullmessage format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN). */
  fullmessageformat: number;
  /** The message in html. */
  fullmessagehtml: string;
  /** The shorten message. */
  smallmessage: string;
  /** Is a notification?. */
  notification: number;
  /** Context URL. */
  contexturl: string;
  /** Context URL link name. */
  contexturlname: string;
  /** Time created. */
  timecreated: number;
  /** Time read. */
  timeread: number | null;
  /** User to full name. */
  usertofullname: string;
  /** User from full name. */
  userfromfullname: string;
  /** @since 3.7. The component that generated the notification. */
  component?: string;
  /** @since 3.7. The type of notification. */
  eventtype?: string;
  /** @since 3.7. Custom data to be passed to the message processor. */
  customdata?: string;
  /** @since 4.0. Icon URL, only for notifications. */
  iconurl?: string;
};

/**
 * Data returned by core_message_get_messages WS.
 */
export type AddonNotificationsGetMessagesWSResponse = {
  messages: AddonNotificationsNotificationMessage[];
  warnings?: CoreWSExternalWarning[];
};

/**
 * Result of WS core_webservice_get_site_info.
 */
export type CoreSiteInfoResponse = {
  /** Site name. */
  sitename: string;
  /** Username. */
  username: string;
  /** First name. */
  firstname: string;
  /** Last name. */
  lastname: string;
  /** User full name. */
  fullname: string;
  /** Current language. */
  lang: string;
  /** User id. */
  userid: number;
  /** Site url. */
  siteurl: string;
  /** The user profile picture. */
  userpictureurl: string;
  functions: {
    /** Function name. */
    name: string;
    /** The version number of the component to which the function belongs. */
    version: string;
  }[];
  /** 1 if users are allowed to download files, 0 if not. */
  downloadfiles?: number;
  /** 1 if users are allowed to upload files, 0 if not. */
  uploadfiles?: number;
  /** Moodle release number. */
  release?: string;
  /** Moodle version number. */
  version?: string;
  /** Mobile custom CSS theme. */
  mobilecssurl?: string;
  /** Advanced features availability. */
  advancedfeatures?: {
    /** Feature name. */
    name: string;
    /** Feature value. Usually 1 means enabled. */
    value: number;
  }[];
  /** True if the user can manage his own files. */
  usercanmanageownfiles?: boolean;
  /** User quota (bytes). 0 means user can ignore the quota. */
  userquota?: number;
  /** User max upload file size (bytes). -1 means the user can ignore the upload file size. */
  usermaxuploadfilesize?: number;
  /** The default home page for the user. */
  userhomepage?: CoreSiteInfoUserHomepage;
  /** Private user access key for fetching files. */
  userprivateaccesskey?: string;
  /** Site course ID. */
  siteid?: number;
  /** Calendar type set in the site. */
  sitecalendartype?: string;
  /** Calendar typed used by the user. */
  usercalendartype?: string;
  /** Whether the user is a site admin or not. */
  userissiteadmin?: boolean;
  /** Current theme for the user. */
  theme?: string;
};

/**
 * Basic data obtained form any course.
 */
export type CoreCourseBasicData = {
  /** Course id. */
  id: number;
  /** Course full name. */
  fullname: string;
  /** Course display name. */
  displayname?: string;
  /** Course short name. */
  shortname: string;
  /** Summary. */
  summary: string;
  /** Summary format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN). */
  summaryformat: number;
  /** Course category id. */
  categoryid?: number;
};

/**
 * Course data exported by course_summary_exporter;
 */
export type CoreCourseSummaryData = CoreCourseBasicData & {
  /** Idnumber. */
  idnumber: string;
  /** Startdate. */
  startdate: number;
  /** Enddate. */
  enddate: number;
  /** Visible. */
  visible: boolean;
  /** Showactivitydates. */
  showactivitydates: boolean;
  /** Showcompletionconditions. */
  showcompletionconditions: boolean;
  /** Fullnamedisplay. */
  fullnamedisplay: string;
  /** Viewurl. */
  viewurl: string;
  /** Courseimage. */
  courseimage: string;
  /** Progress. */
  progress?: number;
  /** Hasprogress. */
  hasprogress: boolean;
  /** Isfavourite. */
  isfavourite: boolean;
  /** Hidden. */
  hidden: boolean;
  /** Timeaccess. */
  timeaccess?: number;
  /** Showshortname. */
  showshortname: boolean;
  /** Coursecategory. */
  coursecategory: string;
};

/**
 * Data returned by core_course_get_enrolled_courses_by_timeline_classification WS.
 */
export type CoreCourseGetEnrolledCoursesByTimelineClassificationWSResponse = {
  courses: CoreCourseSummaryData[];
  /** Offset for the next request. */
  nextoffset: number;
};

/**
 * Result of WS tool_mobile_get_autologin_key.
 */
export type CoreSiteAutologinKeyResult = {
  /** Auto-login key for a single usage with time expiration. */
  key: string;
  /** Auto-login URL. */
  autologinurl: string;
  warnings?: CoreWSExternalWarning[];
};
