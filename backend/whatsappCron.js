const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const cron = require("node-cron");
const mongoose = require("mongoose");
const Student = require("./models/Student");
const Fee = require("./models/Fee");
require("dotenv").config();

// ✅ DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.log("❌ DB connection error", err));

// ✅ WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("Scan the QR code below:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp is ready!");

  // 🔁 Cron Job: Every 5th day of month at 9 AM
  //   cron.schedule("* * * * *", async () => {
  //     console.log("⏰ Running monthly reminder cron...");

  //     const today = new Date();
  //     const currentMonth = today.getMonth() + 1;
  //     const currentYear = today.getFullYear();

  //     try {
  //       const students = await Student.find();

  //       for (const student of students) {
  //         const feePaid = await Fee.findOne({
  //           studentId: student._id,
  //           $expr: {
  //             $and: [
  //               { $eq: [{ $month: "$datePaid" }, currentMonth] },
  //               { $eq: [{ $year: "$datePaid" }, currentYear] },
  //             ],
  //           },
  //         });

  //         if (!feePaid && student.phone) {
  //           const message = `Reminder: Your child's (${student.name}) monthly fee at Elite Football Academy is still pending. Kindly pay it at the earliest.`;

  //           await client.sendMessage(`91${student.phone}@c.us`, message);
  //           console.log(`📤 Sent to ${student.phone}`);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("❌ Error:", err.message);
  //     }
  //   });

  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running test reminder cron...");

    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000); // 1 minute ago

    try {
      const students = await Student.find();

      for (const student of students) {
        const feePaidRecently = await Fee.findOne({
          studentId: student._id,
          datePaid: { $gte: oneMinuteAgo },
        });

        if (!feePaidRecently && student.phoneNumber) {
          const message = `TEST REMINDER: ${student.name}'s fee has not been paid in the last minute. Please take action.`;

          await client.sendMessage(`91${student.phoneNumber}@c.us`, message);
          console.log(`📤 Sent test reminder to ${student.phoneNumber}`);
        }
      }
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  });
});

client.initialize();
