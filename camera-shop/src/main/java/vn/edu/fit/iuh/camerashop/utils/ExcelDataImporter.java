package vn.edu.fit.iuh.camerashop.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import vn.edu.fit.iuh.camerashop.entity.*;
import vn.edu.fit.iuh.camerashop.repository.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExcelDataImporter {
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final FeatureRepository featureRepository;
    private final CameraRepository cameraRepository;
    private final VariantRepository variantRepository;
    private final PostRepository postRepository;

    public void importDataFromExcel(String filePath) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fileInputStream);

        importBrandData(workbook.getSheet("Brand"));
        importCategoryData(workbook.getSheet("Category"));
        importFeatureData(workbook.getSheet("Feature"));

        importCameraData(workbook.getSheet("Camera"));

        importVariantData(workbook.getSheet("Variant"));

        importPostData(workbook.getSheet("Post"));
    }

    private void importBrandData(Sheet sheet) {
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            Brand brand = new Brand();
            brand.setId((int) row.getCell(0).getNumericCellValue());
            brand.setBrandName(row.getCell(1).getStringCellValue());
            brand.setImage(row.getCell(2).getStringCellValue());
            brand.setCode(row.getCell(3).getStringCellValue());
            brand.setActive(row.getCell(4).getNumericCellValue() == 1);
            brandRepository.save(brand);
        }
    }

    private void importPostData(Sheet sheet) {
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            Post post = new Post();
            post.setId((int) row.getCell(0).getNumericCellValue());
            post.setTitle(row.getCell(1).getStringCellValue());
            post.setSummary(row.getCell(2).getStringCellValue());
            post.setContent(row.getCell(3).getStringCellValue());
            post.setAuthorName(row.getCell(4).getStringCellValue());

            Cell dateCell = row.getCell(5);
            Date publishedAt = null;
            if (dateCell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(dateCell)) {
                publishedAt = dateCell.getDateCellValue();
            } else if (dateCell.getCellType() == CellType.STRING) {
                try {
                    publishedAt = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH).parse(dateCell.getStringCellValue());
                } catch (ParseException e) {
                    log.error("Error: {}", e.getMessage());
                }
            }
            post.setPublishedAt(publishedAt);

            post.setImage(row.getCell(6).getStringCellValue());
            postRepository.save(post);
        }
    }


    private void importCategoryData(Sheet sheet) {
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            Category category = new Category();
            category.setId((int) row.getCell(0).getNumericCellValue());
            category.setCategoryName(row.getCell(1).getStringCellValue());
            category.setImage(row.getCell(2).getStringCellValue());
            category.setCode(row.getCell(3).getStringCellValue());
            category.setActive(row.getCell(4).getNumericCellValue() == 1);
            categoryRepository.save(category);
        }
    }

    private void importFeatureData(Sheet sheet) {
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            Feature feature = new Feature();
            feature.setId((int) row.getCell(0).getNumericCellValue());
            feature.setFeatureName(row.getCell(1).getStringCellValue());
            feature.setCode(row.getCell(2).getStringCellValue());
            featureRepository.save(feature);
        }
    }

    private void importCameraData(Sheet sheet) {
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            Camera camera = new Camera();
            camera.setId((int) row.getCell(0).getNumericCellValue());
            camera.setName(row.getCell(1).getStringCellValue());

            int brandId = (int) row.getCell(2).getNumericCellValue();
            int categoryId = (int) row.getCell(3).getNumericCellValue();

            camera.setBrand(brandRepository.findById(brandId).orElse(null));
            camera.setCategory(categoryRepository.findById(categoryId).orElse(null));

            if (camera.getBrand() == null) {
                log.error("Brand not found for ID: {}", brandId);
            }
            if (camera.getCategory() == null) {
                log.error("Category not found for ID: {}", categoryId);
            }

            camera.setWarrantyPeriod(getCellValueAsString(row.getCell(4)));

            List<Feature> features = new ArrayList<>();
            if (row.getCell(5) != null && !row.getCell(5).getStringCellValue().isEmpty()) {
                String[] featureIds = row.getCell(5).getStringCellValue().split(",");
                for (String featureId : featureIds) {
                    features.add(featureRepository.findById(Integer.parseInt(featureId.trim())).orElse(null));
                }
            }
            camera.setFeatures(features);
            camera.setDescription(row.getCell(6).getStringCellValue());
            camera.setISO(row.getCell(7).getStringCellValue());
            camera.setShootingSpeed(row.getCell(8).getStringCellValue());
            camera.setStabilization(row.getCell(9).getStringCellValue());
            camera.setResolution(row.getCell(10).getStringCellValue());
            camera.setSensorType(row.getCell(11).getStringCellValue());
            camera.setVideoResolution(row.getCell(12).getStringCellValue());
            camera.setBattery(row.getCell(13).getStringCellValue());
            camera.setWeight(row.getCell(14).getStringCellValue());
            camera.setSize(row.getCell(15).getStringCellValue());

            camera.setHot(row.getCell(16).getNumericCellValue() == 1);

            if (row.getCell(17) != null && !row.getCell(17).getStringCellValue().isEmpty()) {
                camera.setImages(Arrays.asList(row.getCell(17).getStringCellValue().split(",")));
            }

            camera.setActive(row.getCell(18).getNumericCellValue() == 1);

            cameraRepository.save(camera);
        }
    }

    private void importVariantData(Sheet sheet) {
        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            Variant variant = new Variant();
            variant.setId((int) row.getCell(0).getNumericCellValue());

            int cameraId = (int) row.getCell(1).getNumericCellValue();
            variant.setCamera(cameraRepository.findById(cameraId).orElse(null));
            if (variant.getCamera() == null) {
                log.error("Camera not found for ID: {}", cameraId);
            }

            variant.setSource(row.getCell(2).getStringCellValue());
            variant.setColor(row.getCell(3).getStringCellValue());

            Cell styleCell = row.getCell(4);
            if (styleCell != null) {
                variant.setStyle(styleCell.getStringCellValue());
            } else {
                variant.setStyle(null);
            }

            Cell setCell = row.getCell(5);
            if (setCell != null) {
                variant.setSet(setCell.getStringCellValue());
            } else {
                variant.setSet(null);
            }

            variant.setQuantity((int) row.getCell(6).getNumericCellValue());
            variant.setDiscount(row.getCell(7).getNumericCellValue());
            variant.setPrice(row.getCell(8).getNumericCellValue());

            if (row.getCell(9) != null && !row.getCell(9).getStringCellValue().isEmpty()) {
                variant.setImages(Arrays.asList(row.getCell(9).getStringCellValue().split(",")));
            }

            variant.setActive(row.getCell(10).getNumericCellValue() == 1);

            variantRepository.save(variant);
        }
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return null;
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return Boolean.toString(cell.getBooleanCellValue());
            case FORMULA:
                switch (cell.getCachedFormulaResultType()) {
                    case STRING:
                        return cell.getRichStringCellValue().getString();
                    case NUMERIC:
                        return String.valueOf((int) cell.getNumericCellValue());
                    case BOOLEAN:
                        return Boolean.toString(cell.getBooleanCellValue());
                }
            default:
                return "";
        }
    }
}
