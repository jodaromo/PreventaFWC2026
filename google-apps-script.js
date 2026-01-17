/**
 * Google Apps Script for FIFA 2026 Panini Reservation Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default Code.gs content with this code
 * 4. Create a Google Sheet and copy its ID from the URL
 * 5. Replace SPREADSHEET_ID below with your sheet's ID
 * 6. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy" and copy the URL
 * 7. Update GOOGLE_SCRIPT_URL in ReserveSection.jsx with your deployment URL
 */

// Replace with your Google Sheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Reservas';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      newSheet.appendRow([
        'Timestamp',
        'Nombre',
        'WhatsApp',
        'Cajas',
        'Pasta Blanda',
        'Pasta Dura',
        'Sobres',
        'Dirección',
        'Ciudad'
      ]);

      // Style the header row
      const headerRange = newSheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#E07B4C'); // Maple color
      headerRange.setFontColor('#FFFFFF');
    }

    const targetSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    // Append the new row
    targetSheet.appendRow([
      new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      data.nombre || '',
      data.whatsapp || '',
      data.cajas || 0,
      data.pastaBlanda || 0,
      data.pastaDura || 0,
      data.sobres || 0,
      data.direccion || '',
      data.ciudad || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Reserva guardada correctamente' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'FIFA 2026 Reservation API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Run this to verify the script works
 */
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Test User',
        whatsapp: '300 123 4567',
        cajas: 2,
        pastaBlanda: 1,
        pastaDura: 0,
        sobres: 10,
        direccion: 'Calle 123 #45-67',
        ciudad: 'Bogotá'
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
