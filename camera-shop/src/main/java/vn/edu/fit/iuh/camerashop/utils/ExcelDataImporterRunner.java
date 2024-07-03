package vn.edu.fit.iuh.camerashop.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import vn.edu.fit.iuh.camerashop.repository.*;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExcelDataImporterRunner implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final FeatureRepository featureRepository;
    private final CameraRepository cameraRepository;
    private final VariantRepository variantRepository;

    @Override
    public void run(String... args) {
        if (brandRepository.count() == 0 &&
                categoryRepository.count() == 0 &&
                cameraRepository.count() == 0 &&
                featureRepository.count() == 0 &&
                variantRepository.count() == 0) {

            try {
                String filePath = "data.xlsx";
                File file = getFileFromResources(filePath);
                if (file.exists()) {
                    ExcelDataImporter importer = new ExcelDataImporter(
                            brandRepository, categoryRepository, featureRepository, cameraRepository, variantRepository);
                    importer.importDataFromExcel(file.getPath());
                } else {
                    log.info("File {} does not exist.", filePath);
                    throw new NotFoundException("File " + filePath + " not found");
                }
            } catch (IOException | URISyntaxException e) {
                log.error("Error reading Excel file: {}", e.getMessage());
            }
        }
    }

    private File getFileFromResources(String fileName) throws IOException, URISyntaxException {
        ClassLoader classLoader = getClass().getClassLoader();
        URL resource = classLoader.getResource(fileName);
        if (resource == null) {
            throw new NotFoundException("File not found: " + fileName);
        }
        return Paths.get(resource.toURI()).toFile();
    }
}
