import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const subscription = await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );

    if (!subscription || subscription.status !== "active") {
      return res
        .status(404)
        .json({ message: "Active subscription not found." });
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
      console.log(
        `Renewal date has passed for subscription ${subscriptionId}. Stopping reminders.`
      );
      return res
        .status(200)
        .json({ message: "Renewal date passed. No reminders sent." });
    }

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, "day");

      if (reminderDate.isAfter(dayjs())) {
        console.log(
          `Scheduled reminder ${daysBefore} days before at ${reminderDate}`
        );
        // simulate scheduling (or integrate a scheduler)
        await sleepUntil(reminderDate);
      }

      await triggerReminder(`Reminder ${daysBefore} days before`);
    }

    res.status(200).json({ message: "Reminders processed successfully." });
  } catch (error) {
    console.error("Error sending reminders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // Send email, SMS, push notification ...
  });
};
