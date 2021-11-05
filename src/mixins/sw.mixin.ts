/**
 * Source:
 * https://dev.to/drbragg/handling-service-worker-updates-in-your-vue-pwa-1pip
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  name: "SWMixin",
})
export default class SWMixin extends Vue {
  refreshing = false;
  updateExists = false;
  registration: { waiting: any } | null = null;

  created() {
    // Listen for our custom event from the SW registration
    document.addEventListener("swUpdated", this.updateAvailable, {
      once: true,
    });

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      // Here the actual reload of the page occurs
      window.location.reload();
    });
  }

  /**
   * Store the SW registration so we can send it a message.
   * We use `updateExists` to control whatever alert, toast, dialog, etc we want to use.
   * To alert the user there is an update they need to refresh for.
   */
  updateAvailable(event: any) {
    console.log("SW updateAvailable", event);
    this.registration = event.detail;
    this.updateExists = true;
  }

  /**
   * Called when the user accepts the update
   */
  refreshApp() {
    this.updateExists = false;
    // Make sure we only send a 'skip waiting' message if the SW is waiting
    if (!this.registration || !this.registration.waiting) return;
    // Send message to SW to skip the waiting and activate the new SW
    this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
  }
}
