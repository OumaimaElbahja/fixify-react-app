-- ===============================================
-- 🔧 SCHÉMA MYSQL POUR FIXIFY
-- Plateforme de mise en relation clients/réparateurs
-- ===============================================

-- Configuration de la base de données
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS fixify_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE fixify_db;

-- ===============================================
-- 👥 TABLE DES UTILISATEURS (CLIENTS)
-- ===============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'France',
    avatar_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    preferred_language VARCHAR(5) DEFAULT 'fr',
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_city (city),
    INDEX idx_created_at (created_at)
);

-- ===============================================
-- 🔧 TABLE DES RÉPARATEURS
-- ===============================================
CREATE TABLE repairers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    user_id INT,
    business_name VARCHAR(200),
    business_type ENUM('individual', 'company') DEFAULT 'individual',
    siret VARCHAR(14),
    description TEXT,
    experience_years INT DEFAULT 0,
    certification_level ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
    is_certified BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    service_radius INT DEFAULT 10, -- en kilomètres
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    total_repairs INT DEFAULT 0,
    response_time_hours INT DEFAULT 24,
    pricing_type ENUM('fixed', 'hourly', 'quote') DEFAULT 'quote',
    hourly_rate DECIMAL(8,2),
    travel_cost DECIMAL(8,2) DEFAULT 0.00,
    emergency_available BOOLEAN DEFAULT FALSE,
    weekend_available BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_city (user_id),
    INDEX idx_rating (rating_average),
    INDEX idx_available (is_available),
    INDEX idx_certified (is_certified)
);

-- ===============================================
-- 📋 TABLE DES CATÉGORIES DE SERVICES
-- ===============================================
CREATE TABLE service_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_active (is_active)
);

-- ===============================================
-- 🛠️ TABLE DES SERVICES
-- ===============================================
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    estimated_duration_hours DECIMAL(4,2),
    average_price_min DECIMAL(8,2),
    average_price_max DECIMAL(8,2),
    requires_parts BOOLEAN DEFAULT FALSE,
    difficulty_level ENUM('easy', 'medium', 'hard', 'expert') DEFAULT 'medium',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_name (name),
    INDEX idx_active (is_active)
);

-- ===============================================
-- 🔗 TABLE DE LIAISON RÉPARATEURS-SERVICES
-- ===============================================
CREATE TABLE repairer_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    repairer_id INT NOT NULL,
    service_id INT NOT NULL,
    experience_level ENUM('beginner', 'intermediate', 'advanced', 'expert') DEFAULT 'intermediate',
    base_price DECIMAL(8,2),
    max_price DECIMAL(8,2),
    estimated_duration_hours DECIMAL(4,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repairer_id) REFERENCES repairers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE KEY unique_repairer_service (repairer_id, service_id),
    INDEX idx_repairer (repairer_id),
    INDEX idx_service (service_id)
);

-- ===============================================
-- 📝 TABLE DES DEMANDES DE RÉPARATION
-- ===============================================
CREATE TABLE repair_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    urgency ENUM('low', 'medium', 'high', 'emergency') DEFAULT 'medium',
    preferred_date DATETIME,
    budget_min DECIMAL(8,2),
    budget_max DECIMAL(8,2),
    location_address TEXT,
    location_city VARCHAR(100),
    location_postal_code VARCHAR(10),
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    status ENUM('draft', 'published', 'assigned', 'in_progress', 'completed', 'cancelled') DEFAULT 'draft',
    assigned_repairer_id INT NULL,
    assigned_at TIMESTAMP NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    cancellation_reason TEXT,
    final_price DECIMAL(8,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (assigned_repairer_id) REFERENCES repairers(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_service (service_id),
    INDEX idx_status (status),
    INDEX idx_location (location_city, location_postal_code),
    INDEX idx_date (preferred_date),
    INDEX idx_created (created_at)
);

-- ===============================================
-- 💬 TABLE DES PROPOSITIONS DE RÉPARATEURS
-- ===============================================
CREATE TABLE repair_proposals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    repairer_id INT NOT NULL,
    price_estimate DECIMAL(8,2) NOT NULL,
    estimated_duration_hours DECIMAL(4,2),
    proposed_date DATETIME,
    message TEXT,
    includes_parts BOOLEAN DEFAULT FALSE,
    parts_cost DECIMAL(8,2) DEFAULT 0.00,
    travel_cost DECIMAL(8,2) DEFAULT 0.00,
    warranty_months INT DEFAULT 0,
    status ENUM('pending', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES repair_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (repairer_id) REFERENCES repairers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_request_repairer (request_id, repairer_id),
    INDEX idx_request (request_id),
    INDEX idx_repairer (repairer_id),
    INDEX idx_status (status)
);

-- ===============================================
-- ⭐ TABLE DES ÉVALUATIONS
-- ===============================================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    user_id INT NOT NULL,
    repairer_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    quality_rating INT CHECK (quality_rating >= 1 AND quality_rating <= 5),
    punctuality_rating INT CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
    communication_rating INT CHECK (communication_rating >= 1 AND communication_rating <= 5),
    price_rating INT CHECK (price_rating >= 1 AND price_rating <= 5),
    would_recommend BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    repairer_response TEXT,
    repairer_response_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES repair_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (repairer_id) REFERENCES repairers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (request_id, user_id, repairer_id),
    INDEX idx_repairer (repairer_id),
    INDEX idx_rating (rating),
    INDEX idx_created (created_at)
);

-- ===============================================
-- 📱 TABLE DES SESSIONS DE CONNEXION
-- ===============================================
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    device_type VARCHAR(50),
    device_info TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_token (session_token),
    INDEX idx_expires (expires_at)
);

-- ===============================================
-- 📄 TABLE DES DOCUMENTS
-- ===============================================
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    user_id INT,
    repairer_id INT,
    request_id INT,
    document_type ENUM('id_card', 'certification', 'insurance', 'photo', 'invoice', 'warranty', 'other') NOT NULL,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by INT,
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (repairer_id) REFERENCES repairers(id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES repair_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_repairer (repairer_id),
    INDEX idx_request (request_id),
    INDEX idx_type (document_type)
);

-- ===============================================
-- 💰 TABLE DES PAIEMENTS
-- ===============================================
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    request_id INT NOT NULL,
    user_id INT NOT NULL,
    repairer_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) DEFAULT 0.00,
    repairer_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    payment_method ENUM('card', 'bank_transfer', 'paypal', 'cash') DEFAULT 'card',
    payment_provider VARCHAR(50),
    provider_transaction_id VARCHAR(255),
    status ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'disputed') DEFAULT 'pending',
    paid_at TIMESTAMP NULL,
    refunded_at TIMESTAMP NULL,
    refund_amount DECIMAL(10,2),
    refund_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES repair_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (repairer_id) REFERENCES repairers(id) ON DELETE CASCADE,
    INDEX idx_request (request_id),
    INDEX idx_user (user_id),
    INDEX idx_repairer (repairer_id),
    INDEX idx_status (status),
    INDEX idx_paid_at (paid_at)
);

-- ===============================================
-- 🔔 TABLE DES NOTIFICATIONS
-- ===============================================
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('request_update', 'new_proposal', 'payment', 'review', 'system', 'promotion') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSON,
    is_read BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
);

-- ===============================================
-- 📊 TABLE DES STATISTIQUES RÉPARATEURS
-- ===============================================
CREATE TABLE repairer_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    repairer_id INT NOT NULL,
    month YEAR_MONTH NOT NULL,
    total_requests INT DEFAULT 0,
    completed_requests INT DEFAULT 0,
    cancelled_requests INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    average_response_time_hours DECIMAL(6,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (repairer_id) REFERENCES repairers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_repairer_month (repairer_id, month),
    INDEX idx_repairer (repairer_id),
    INDEX idx_month (month)
);

-- ===============================================
-- 🛡️ TABLE DES LOGS DE SÉCURITÉ
-- ===============================================
CREATE TABLE security_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type ENUM('login', 'logout', 'login_failed', 'password_change', 'email_change', 'data_access', 'data_modification', 'suspicious_activity') NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSON,
    risk_level ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_action (action_type),
    INDEX idx_risk (risk_level),
    INDEX idx_created (created_at)
);

-- ===============================================
-- 📈 DONNÉES D'EXEMPLE POUR TESTS
-- ===============================================

-- Catégories de services
INSERT INTO service_categories (name, description, icon_name) VALUES
('Électroménager', 'Réparation d\'appareils électroménagers', 'appliance'),
('Électronique', 'Réparation d\'appareils électroniques', 'smartphone'),
('Plomberie', 'Services de plomberie et sanitaire', 'wrench'),
('Électricité', 'Installation et réparation électrique', 'zap'),
('Jardinage', 'Entretien et aménagement extérieur', 'tree'),
('Informatique', 'Réparation ordinateurs et périphériques', 'monitor');

-- Services par catégorie
INSERT INTO services (category_id, name, description, estimated_duration_hours, average_price_min, average_price_max) VALUES
(1, 'Réparation lave-linge', 'Diagnostic et réparation de lave-linge', 2.0, 80.00, 200.00),
(1, 'Réparation lave-vaisselle', 'Diagnostic et réparation de lave-vaisselle', 1.5, 70.00, 180.00),
(1, 'Réparation réfrigérateur', 'Diagnostic et réparation de réfrigérateur', 2.5, 100.00, 300.00),
(2, 'Réparation smartphone', 'Réparation écran, batterie, connecteurs', 1.0, 50.00, 200.00),
(2, 'Réparation ordinateur portable', 'Diagnostic et réparation PC portable', 3.0, 80.00, 250.00),
(3, 'Débouchage canalisation', 'Débouchage évier, lavabo, WC', 1.0, 60.00, 120.00),
(3, 'Réparation fuite d\'eau', 'Réparation robinetterie et fuites', 2.0, 80.00, 200.00),
(4, 'Installation prise électrique', 'Installation de prises et interrupteurs', 1.0, 50.00, 100.00),
(4, 'Réparation tableau électrique', 'Diagnostic et réparation électrique', 3.0, 120.00, 400.00);

-- Utilisateur de test
INSERT INTO users (email, password_hash, first_name, last_name, phone, city, postal_code) VALUES
('test@fixify.fr', '$2b$10$test_hash', 'Jean', 'Dupont', '0123456789', 'Paris', '75001'),
('reparateur@fixify.fr', '$2b$10$test_hash', 'Marie', 'Martin', '0123456790', 'Lyon', '69001');

-- Réparateur de test
INSERT INTO repairers (user_id, business_name, description, experience_years, is_certified, is_verified, rating_average, rating_count) VALUES
(2, 'Martin Réparations', 'Spécialiste électroménager depuis 10 ans', 10, TRUE, TRUE, 4.8, 156);

-- Services du réparateur
INSERT INTO repairer_services (repairer_id, service_id, experience_level, base_price, max_price, estimated_duration_hours) VALUES
(1, 1, 'expert', 90.00, 180.00, 2.0),
(1, 2, 'advanced', 80.00, 160.00, 1.5),
(1, 3, 'expert', 120.00, 280.00, 2.5);

-- ===============================================
-- 🔧 TRIGGERS POUR MISE À JOUR AUTOMATIQUE
-- ===============================================

-- Trigger pour mettre à jour la note moyenne des réparateurs
DELIMITER //
CREATE TRIGGER update_repairer_rating 
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE repairers 
    SET rating_average = (
        SELECT AVG(rating) 
        FROM reviews 
        WHERE repairer_id = NEW.repairer_id
    ),
    rating_count = (
        SELECT COUNT(*) 
        FROM reviews 
        WHERE repairer_id = NEW.repairer_id
    )
    WHERE id = NEW.repairer_id;
END//
DELIMITER ;

-- Trigger pour incrémenter le compteur de réparations
DELIMITER //
CREATE TRIGGER update_total_repairs 
AFTER UPDATE ON repair_requests
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE repairers 
        SET total_repairs = total_repairs + 1
        WHERE id = NEW.assigned_repairer_id;
    END IF;
END//
DELIMITER ;

-- ===============================================
-- 📊 VUES POUR STATISTIQUES
-- ===============================================

-- Vue des réparateurs actifs avec leurs statistiques
CREATE VIEW active_repairers_stats AS
SELECT 
    r.id,
    r.uuid,
    u.first_name,
    u.last_name,
    r.business_name,
    r.rating_average,
    r.rating_count,
    r.total_repairs,
    r.is_certified,
    r.is_verified,
    r.is_available,
    u.city,
    COUNT(DISTINCT rs.service_id) as services_count
FROM repairers r
JOIN users u ON r.user_id = u.id
LEFT JOIN repairer_services rs ON r.id = rs.repairer_id AND rs.is_active = TRUE
WHERE r.is_available = TRUE AND u.is_active = TRUE
GROUP BY r.id;

-- Vue des demandes en cours
CREATE VIEW active_repair_requests AS
SELECT 
    rr.id,
    rr.uuid,
    rr.title,
    rr.status,
    rr.urgency,
    rr.preferred_date,
    rr.budget_max,
    u.first_name as client_first_name,
    u.last_name as client_last_name,
    s.name as service_name,
    sc.name as category_name,
    rr.location_city,
    rr.created_at
FROM repair_requests rr
JOIN users u ON rr.user_id = u.id
JOIN services s ON rr.service_id = s.id
JOIN service_categories sc ON s.category_id = sc.id
WHERE rr.status IN ('published', 'assigned', 'in_progress');

-- Réinitialisation des vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 1;

-- ===============================================
-- ✅ SCHÉMA FIXIFY CRÉÉ AVEC SUCCÈS !
-- ===============================================
-- 
-- 📋 TABLES CRÉÉES : 13 tables principales
-- 🔗 RELATIONS : Clés étrangères configurées
-- 📊 VUES : 2 vues pour les statistiques
-- ⚡ TRIGGERS : Mise à jour automatique des stats
-- 📈 DONNÉES TEST : Exemples intégrés
-- 
-- Prêt pour l'intégration avec Supabase !
-- ===============================================