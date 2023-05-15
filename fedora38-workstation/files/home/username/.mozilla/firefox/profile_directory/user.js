// For reference: https://github.com/arkenfox/user.js/blob/master/user.js

// Still need to remove "Ask to save logins and passwords for websites", "Autofill credit cards"

user_pref("browser.startup.page", 1);
user_pref("browser.startup.homepage", "https://www.google.com");
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.default.sites", "");

// Enable DRM content playing
user_pref("media.eme.enabled", true);

// Autofill settings
user_pref("signon.autofillForms", false);
user_pref("signon.formlessCapture.enabled", false);
user_pref("network.auth.subresource-http-auth-allow", 1);
user_pref("extensions.formautofill.creditCards.enabled", false);
user_pref("signon.rememberSignons", false);

// Recommendations
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("browser.discovery.enabled", false);

/** TELEMETRY ***/
/* 0330: disable new data submission [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
 user_pref("datareporting.policy.dataSubmissionEnabled", false);
 /* 0331: disable Health Reports
  * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical... data ***/
 user_pref("datareporting.healthreport.uploadEnabled", false);
 /* 0332: disable telemetry
  * The "unified" pref affects the behavior of the "enabled" pref
  * - If "unified" is false then "enabled" controls the telemetry module
  * - If "unified" is true then "enabled" only controls whether to record extended data
  * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
  * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
  * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
 user_pref("toolkit.telemetry.unified", false);
 user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
 user_pref("toolkit.telemetry.server", "data:,");
 user_pref("toolkit.telemetry.archive.enabled", false);
 user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
 user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
 user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
 user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
 user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
 /* 0333: disable Telemetry Coverage
  * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
 user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
 user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
 user_pref("toolkit.coverage.endpoint.base", "");
 /* 0334: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
  * Defense-in-depth: currently covered by 0331 ***/
 user_pref("browser.ping-centre.telemetry", false);
 /* 0335: disable Firefox Home (Activity Stream) telemetry ***/
 user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
 user_pref("browser.newtabpage.activity-stream.telemetry", false);
 
 /** STUDIES ***/
 /* 0340: disable Studies
  * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies ***/
 user_pref("app.shield.optoutstudies.enabled", false);
 /* 0341: disable Normandy/Shield [FF60+]
  * Shield is a telemetry system that can push and test "recipes"
  * [1] https://mozilla.github.io/normandy/ ***/
 user_pref("app.normandy.enabled", false);
 user_pref("app.normandy.api_url", "");