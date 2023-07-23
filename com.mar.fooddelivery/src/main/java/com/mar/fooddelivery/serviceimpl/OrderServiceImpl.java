package com.mar.fooddelivery.serviceimpl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.mar.fooddelivery.constants.FoodDeliveryMessages;
import com.mar.fooddelivery.constants.StorePath;
import com.mar.fooddelivery.dao.OrderDao;
import com.mar.fooddelivery.jwt.JwtFilter;
import com.mar.fooddelivery.pojo.Order;
import com.mar.fooddelivery.service.OrderService;
import com.mar.fooddelivery.utilities.FoodDeliveryUtility;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderDao orderDao;
    private final JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> generateOrderBill(Map<String, Object> requestMap) {
        try {
            String fileName;
            if (validateRequestMap(requestMap)) {
                if (requestMap.containsKey("isGenerate") && !(Boolean) requestMap.get("isGenerate")) {
                    fileName = (String) requestMap.get("uuid");
                } else {
                    fileName = FoodDeliveryUtility.getUUID();
                    requestMap.put("uuid", fileName);
                    insertOrder(requestMap);
                }

                String data = "Name: " + requestMap.get("name") + "\nContact Number: " + requestMap.get("contactNumber") +
                        "\nEmail: " + requestMap.get("email") + "\nPayment Method: " + requestMap.get("paymentMethod");

                Document document = new Document();
                PdfWriter.getInstance(document, new FileOutputStream(StorePath.STORE_LOCATION + "/" + fileName + ".pdf"));
                document.open();

                Paragraph chunk = new Paragraph("Food Delivery", getFont("Header"));
                chunk.setAlignment(Element.ALIGN_CENTER);
                document.add(chunk);

                Paragraph paragraph = new Paragraph(data + "\n \n", getFont("Data"));
                paragraph.setAlignment(Element.ALIGN_CENTER);
                document.add(paragraph);

                addOrderItems(document, requestMap);

                Paragraph footer = new Paragraph("Total Order Price: " + requestMap.get("totalAmount") + "$" + "\n", getFont("Data"));
                footer.setAlignment(Element.ALIGN_CENTER);
                document.add(footer);

                document.close();
                return new ResponseEntity<>("{\"uuid\":\"" + fileName + "\"}", HttpStatus.OK);

            } else {
                return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void addOrderItems(Document document, Map<String, Object> requestMap) throws DocumentException, JSONException {
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);
        addTableHeader(table);
        addTableData(table, requestMap);

        document.add(table);
    }

    private void addTableHeader(PdfPTable table) {
        PdfPCell cell;

        cell = new PdfPCell(new Phrase("Item",getFont("Data")));
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);

        cell = new PdfPCell(new Phrase("Quantity",getFont("Data")));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);

        cell = new PdfPCell(new Phrase("Unit Price",getFont("Data")));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);

        cell = new PdfPCell(new Phrase("Total Price",getFont("Data")));
        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);
    }

    private void addTableData(PdfPTable table, Map<String, Object> requestMap) throws JSONException {
        JSONArray jsonArray = FoodDeliveryUtility.getJsonArrayFromString((String) requestMap.get("productDetails"));
        for (int i = 0; i < jsonArray.length(); i++) {
            String itemName = jsonArray.getJSONObject(i).getString("name");
            int quantity = jsonArray.getJSONObject(i).getInt("quantity");
            double unitPrice = jsonArray.getJSONObject(i).getDouble("price");
            double total = jsonArray.getJSONObject(i).getDouble("total");

            PdfPCell cellItemName = new PdfPCell(new Phrase(itemName,getFont("Data")));
            PdfPCell cellQuantity = new PdfPCell(new Phrase(String.valueOf(quantity),getFont("Data")));
            PdfPCell cellUnitPrice = new PdfPCell(new Phrase(String.valueOf(unitPrice) + "$",getFont("Data")));
            PdfPCell cellTotal = new PdfPCell(new Phrase(String.valueOf(total) + "$",getFont("Data")));

            cellItemName.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cellItemName.setBorder(Rectangle.NO_BORDER);
            cellQuantity.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellQuantity.setBorder(Rectangle.NO_BORDER);
            cellUnitPrice.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellUnitPrice.setBorder(Rectangle.NO_BORDER);
            cellTotal.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellTotal.setBorder(Rectangle.NO_BORDER);

            table.addCell(cellItemName);
            table.addCell(cellQuantity);
            table.addCell(cellUnitPrice);
            table.addCell(cellTotal);
        }
    }

    private Font getFont(String type) {
        switch (type) {
            case "Header":
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 15, Font.BOLD);
                headerFont.setColor(BaseColor.BLACK);
                return headerFont;
            case "Data":
                Font dataFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, Font.NORMAL);
                dataFont.setColor(BaseColor.GRAY);
                return dataFont;
            default:
                return new Font();
        }
    }

    private void insertOrder(Map<String, Object> requestMap) {
        try {
            Order order = new Order();
            order.setName((String) requestMap.get("name"));
            order.setUuid((String) requestMap.get("uuid"));
            order.setEmail((String) requestMap.get("email"));
            order.setContactNumber((String) requestMap.get("contactNumber"));
            order.setPaymentMethod((String) requestMap.get("paymentMethod"));
            order.setTotal(Double.parseDouble((String) requestMap.get("totalAmount")));
            order.setProductDetail((String) requestMap.get("productDetails"));
            order.setCreatedBy(jwtFilter.getCurrentUserEmail());
            orderDao.save(order);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    private boolean validateRequestMap(Map<String, Object> requestMap) {
        return requestMap.containsKey("name") &&
                requestMap.containsKey("contactNumber") &&
                requestMap.containsKey("email") &&
                requestMap.containsKey("paymentMethod") &&
                requestMap.containsKey("productDetails") &&
                requestMap.containsKey("totalAmount");
    }

    private byte[] getByteArray(String filePath) throws IOException {
        File file = new File(filePath);
        InputStream targetStream = new FileInputStream(file);
        byte[] byteArray = IOUtils.toByteArray(targetStream);
        targetStream.close();
        return byteArray;
    }

    @Override
    public ResponseEntity<List<Order>> getOrders() {
        List<Order> orders = new ArrayList<>();
        try {
            if(jwtFilter.isAdmin()){
                orders = orderDao.getOrders();
            } else {
                orders = orderDao.getOrderByUsername(jwtFilter.getCurrentUserEmail());
            }
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteOrder(Integer id) {
        try {
            Optional<Order> orderOptional = orderDao.findById(id);
            if(orderOptional.isPresent()){
                orderDao.deleteById(id);
                return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.ORDER_DELETE_SUCCESS + id, HttpStatus.OK);
            } else return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.ORDER_NOT_EXIST + id, HttpStatus.NOT_FOUND);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        try {
            byte[] bytes = new byte[0];
            if(!requestMap.containsKey("uuid") && this.validateRequestMap(requestMap)){
                return new ResponseEntity<>(bytes, HttpStatus.BAD_REQUEST);
            }
            String filePath = StorePath.STORE_LOCATION+"/"+(String) requestMap.get("uuid") + ".pdf";
            if(FoodDeliveryUtility.isFileExists(filePath)){
                bytes = this.getByteArray(filePath);
                return new ResponseEntity<>(bytes, HttpStatus.OK);
            } else {
                requestMap.put("isGenerate", false);
                this.generateOrderBill(requestMap);
                bytes = this.getByteArray(filePath);
                return new ResponseEntity<>(bytes, HttpStatus.OK);
            }
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return null;
    }
}