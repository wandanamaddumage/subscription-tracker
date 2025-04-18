import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/epress");

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = new Date(subscription.renewalDate);

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    );
  }

  for (const dayBefore of REMINDERS) {
    const reminderDate = reniwalDate.subtract(daysBefore, "day");
    // renewal date = 22 feb, reminder date = 15 feb, 17, 20, 21
    if (reminderDate.isAfter(dayjs())) {
      // Schedula reminder
    }
  }

  const sleepUntilReminder = async (context, MongoErrorLabel, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
  };
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};
