/**
 * MUCO LABS - Google Apps Script Backend Endpoint for Contact Form & Google Sheets Sync
 * 
 * Instructions to Deploy:
 * 1. Open your Google Sheet (e.g. "MUCO Labs - Client Inquiries")
 * 2. Ensure row 1 has headers: Timestamp | Name | Email | Phone | Company | Service | Subject | Message | Status
 * 3. Go to Extensions -> Apps Script
 * 4. Replace the default code with this entire script
 * 5. Click "Deploy" -> "New deployment"
 * 6. Select type: "Web app"
 * 7. Description: "MUCO Labs Contact Form Endpoint"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone"
 * 10. Click "Deploy", authorize permissions, and copy the Web App URL!
 * 11. Set VITE_GOOGLE_SCRIPT_URL in your .env or settings modal.
 */

function doPost(e) {
  try {
    var contents = {};
    if (e.postData && e.postData.contents) {
      contents = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      contents = e.parameter;
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header exists if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Subject",
        "Message",
        "Status"
      ]);
      // Format header
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#0f172a").setFontColor("#f8fafc");
    }

    var timestamp = contents.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = contents.name || "Valued Client";
    var email = contents.email || "N/A";
    var phone = contents.phone || "N/A";
    var company = contents.company || "Individual / N/A";
    var service = contents.service || contents.serviceCategory || "General Inquiry";
    var subject = contents.subject || "Project Inquiry";
    var message = contents.message || "";
    var status = contents.status || "New";

    // Append new lead row
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      company,
      service,
      subject,
      message,
      status
    ]);

    // Send Auto-Reply Email directly from Gmail / Google Apps Script to the Client
    if (email && email.indexOf("@") !== -1) {
      try {
        var autoReplySubject = "Thank You for Contacting MUCO Labs";
        var autoReplyBody = "Hello " + name + ",\n\n" +
          "Thank you for contacting MUCO Labs.\n\n" +
          "We have successfully received your inquiry regarding '" + subject + "' (" + service + ").\n\n" +
          "Our team will review your request and contact you shortly.\n\n" +
          "We appreciate your interest in working with us.\n\n" +
          "Regards,\n\n" +
          "MUCO Labs\n" +
          "Innovation in Digital Technology\n\n" +
          "Email: mucolabs2026@gmail.com\n" +
          "Website: https://mucolabs.in";

        GmailApp.sendEmail(email, autoReplySubject, autoReplyBody, {
          name: "MUCO Labs Team",
          replyTo: "mucolabs2026@gmail.com"
        });
      } catch (emailErr) {
        Logger.log("Auto-reply email notice: " + emailErr.toString());
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "success": true, "message": "Lead appended successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "online", "service": "MUCO Labs Google Apps Script Endpoint" }))
    .setMimeType(ContentService.MimeType.JSON);
}
