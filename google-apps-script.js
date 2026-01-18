// ============================================
// FIFA 2026 COLLECTPOINT - GOOGLE SHEETS API
// ============================================
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Create a new project
// 3. Replace the default Code.gs content with this code
// 4. Create a Google Sheet and copy its ID from the URL
// 5. Replace SHEET_ID below with your sheet's ID
// 6. Run setupSheet() once to initialize the headers and formatting
// 7. Deploy as Web App:
//    - Click "Deploy" > "New deployment"
//    - Select type: "Web app"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
//    - Click "Deploy" and copy the URL
// 8. Update GOOGLE_SCRIPT_URL in ReserveSection.jsx with your deployment URL
//
// ============================================

// YOUR SHEET ID - Get this from the URL:
// https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
const SHEET_ID = '1WSHd4ct_KKCmrZESaJL9O0ZYnPs_JKtOArJmhJRohco';

// Sheet configuration
const SHEET_NAME = 'Reservas';
const HEADERS = [
  'Fecha',
  'Nombre',
  'WhatsApp',
  'Caja Display',
  'Álbum Pasta Dura',
  'Álbum Pasta Blanda',
  'Sobre Individual',
  'Regalo Pasta Blanda',
  'Total a Pagar',
  'Plan de Pago',
  'Cuota Mensual',
  'Dirección',
  'Ciudad',
  'Estado'
];

// Column widths in pixels
const COLUMN_WIDTHS = {
  'Fecha': 150,
  'Nombre': 180,
  'WhatsApp': 130,
  'Caja Display': 100,
  'Álbum Pasta Dura': 120,
  'Álbum Pasta Blanda': 130,
  'Sobre Individual': 110,
  'Regalo Pasta Blanda': 130,
  'Total a Pagar': 120,
  'Plan de Pago': 100,
  'Cuota Mensual': 110,
  'Dirección': 220,
  'Ciudad': 120,
  'Estado': 100
};

// ============================================
// AUTO-SETUP FUNCTION - Run this once!
// ============================================
function setupSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    Logger.log('Created new sheet: ' + SHEET_NAME);
  }

  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  // Style the header row
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange
    .setBackground('#1a365d')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // Set row height for header
  sheet.setRowHeight(1, 40);

  // Set column widths
  HEADERS.forEach((header, index) => {
    const width = COLUMN_WIDTHS[header] || 120;
    sheet.setColumnWidth(index + 1, width);
  });

  // Freeze header row
  sheet.setFrozenRows(1);

  // Set default formatting for data rows
  const dataRange = sheet.getRange(2, 1, 500, HEADERS.length);
  dataRange
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('center');

  // Format Date column (A)
  sheet.getRange('A2:A').setNumberFormat('dd/mm/yyyy hh:mm');

  // Format product quantity columns (D-H) as numbers
  sheet.getRange('D2:H').setNumberFormat('0');

  // Format currency columns (I, K) - Total a Pagar and Cuota Mensual
  sheet.getRange('I2:I').setNumberFormat('$#,##0');
  sheet.getRange('K2:K').setNumberFormat('$#,##0');

  // Left-align text columns
  sheet.getRange('B2:C').setHorizontalAlignment('left');
  sheet.getRange('L2:M').setHorizontalAlignment('left');

  // Add data validation for Status column (N)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pendiente', 'Contactado', 'Confirmado', 'Pagado', 'Enviado', 'Entregado', 'Cancelado'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('N2:N').setDataValidation(statusRule);

  // Add conditional formatting for Status column
  const statusColors = [
    { status: 'Pendiente', color: '#FEF3C7' },
    { status: 'Contactado', color: '#E0E7FF' },
    { status: 'Confirmado', color: '#DBEAFE' },
    { status: 'Pagado', color: '#D1FAE5' },
    { status: 'Enviado', color: '#A7F3D0' },
    { status: 'Entregado', color: '#6EE7B7' },
    { status: 'Cancelado', color: '#FEE2E2' }
  ];

  const rules = [];
  statusColors.forEach(item => {
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(item.status)
      .setBackground(item.color)
      .setRanges([sheet.getRange('N2:N')])
      .build();
    rules.push(rule);
  });

  // Add conditional formatting for Regalo Pasta Blanda column (H) - highlight when > 0
  const giftRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground('#D1FAE5')
    .setFontColor('#065F46')
    .setRanges([sheet.getRange('H2:H')])
    .build();
  rules.push(giftRule);

  sheet.setConditionalFormatRules(rules);

  // Add alternating row colors
  const bandingRange = sheet.getRange(2, 1, 500, HEADERS.length);
  bandingRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);

  Logger.log('Sheet setup complete!');
  SpreadsheetApp.getUi().alert('✅ Hoja configurada exitosamente!');
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-setup if sheet doesn't exist
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    // Create row data matching new headers
    const newRow = [
      new Date(),                           // Fecha
      data.nombre || '',                    // Nombre
      data.whatsapp || '',                  // WhatsApp
      data.cajaDisplay || 0,                // Caja Display
      data.albumPastaDura || 0,             // Álbum Pasta Dura
      data.albumPastaBlanda || 0,           // Álbum Pasta Blanda
      data.sobreIndividual || 0,            // Sobre Individual
      data.regaloPastaBlanda || 0,          // Regalo Pasta Blanda (quantity, not 0/1)
      data.totalPagar || 0,                 // Total a Pagar
      data.planPago || '',                  // Plan de Pago (e.g., "4 cuotas" or "2 cuotas")
      data.cuotaMensual || 0,               // Cuota Mensual
      data.direccion || '',                 // Dirección
      data.ciudad || '',                    // Ciudad
      'Pendiente'                           // Estado
    ];

    // Append row
    sheet.appendRow(newRow);

    // Format the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, HEADERS.length).setVerticalAlignment('middle');
    sheet.setRowHeight(lastRow, 30);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Reserva registrada exitosamente',
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'FIFA 2026 CollectPoint Reservation API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function testSetup() {
  setupSheet();
}

function addTestRow() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Juan Pérez (TEST)',
        whatsapp: '300 123 4567',
        cajaDisplay: 4,
        albumPastaDura: 1,
        albumPastaBlanda: 0,
        sobreIndividual: 5,
        regaloPastaBlanda: 2,  // 4 boxes = 2 free albums
        totalPagar: 2149950,   // Example total
        planPago: '4 cuotas',
        cuotaMensual: 537488,
        direccion: 'Calle 123 #45-67, Chapinero',
        ciudad: 'Bogotá'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}

function getStats() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    Logger.log('No sheet found');
    return;
  }

  const lastRow = sheet.getLastRow();
  const dataRows = lastRow - 1;

  Logger.log('=== ESTADÍSTICAS ===');
  Logger.log('Total reservas: ' + dataRows);

  if (dataRows > 0) {
    // Status breakdown (column N = 14)
    const statusCol = sheet.getRange(2, 14, dataRows, 1).getValues();
    const statusCounts = {};
    statusCol.forEach(row => {
      const status = row[0] || 'Sin estado';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    Logger.log('\nPor estado:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      Logger.log('  ' + status + ': ' + count);
    });

    // Product totals (columns D-G = 4-7)
    const productCols = sheet.getRange(2, 4, dataRows, 4).getValues();
    let totalCajas = 0, totalDura = 0, totalBlanda = 0, totalSobres = 0;
    productCols.forEach(row => {
      totalCajas += Number(row[0]) || 0;
      totalDura += Number(row[1]) || 0;
      totalBlanda += Number(row[2]) || 0;
      totalSobres += Number(row[3]) || 0;
    });

    Logger.log('\nProductos totales:');
    Logger.log('  Cajas Display: ' + totalCajas);
    Logger.log('  Álbum Pasta Dura: ' + totalDura);
    Logger.log('  Álbum Pasta Blanda: ' + totalBlanda);
    Logger.log('  Sobres Individuales: ' + totalSobres);

    // Free gifts given (column H = 8)
    const giftCol = sheet.getRange(2, 8, dataRows, 1).getValues();
    const totalGifts = giftCol.reduce((sum, row) => sum + (Number(row[0]) || 0), 0);
    Logger.log('\nÁlbumes regalados (gratis): ' + totalGifts);

    // Revenue totals (column I = 9)
    const revenueCol = sheet.getRange(2, 9, dataRows, 1).getValues();
    const totalRevenue = revenueCol.reduce((sum, row) => sum + (Number(row[0]) || 0), 0);
    Logger.log('\nIngresos totales (reservados): $' + totalRevenue.toLocaleString('es-CO'));

    // Payment plan breakdown (column J = 10)
    const planCol = sheet.getRange(2, 10, dataRows, 1).getValues();
    const planCounts = {};
    planCol.forEach(row => {
      const plan = row[0] || 'Sin plan';
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });

    Logger.log('\nPor plan de pago:');
    Object.entries(planCounts).forEach(([plan, count]) => {
      Logger.log('  ' + plan + ': ' + count);
    });
  }
}
