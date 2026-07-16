INSERT INTO categories (slug, name_ka, sort_order) VALUES
	('body', 'ძარა', 1),
	('chassis', 'სავალი ნაწილი', 2),
	('interior', 'სალონი', 3),
	('electronics', 'ელექტრონიკა', 4),
	('optics', 'ოპტიკა', 5),
	('accessories', 'აქსესუარები', 6);

INSERT INTO products (slug, title_ka, description_ka, category_id, tesla_model, year_from, year_to, condition, price_tetri, quantity, oem_number, status, created_at, updated_at) VALUES
	('model-3-tsina-fara-marjvena', 'Model 3 წინა ფარა, მარჯვენა (LED)', 'ორიგინალი Tesla Model 3 წინა LED ფარა, მარჯვენა მხარე. მოხსნილია გამართული მანქანიდან, დაზიანების გარეშე.', 5, 'model_3', 2019, 2023, 'used', 45000, 1, '1077070-00-A', 'active', unixepoch(), unixepoch()),
	('model-y-ukana-bamperi', 'Model Y უკანა ბამპერი', 'ახალი, ქარხნული Model Y უკანა ბამპერი, შეღებვის გარეშე.', 1, 'model_y', 2021, 2024, 'new', 89000, 2, NULL, 'active', unixepoch(), unixepoch()),
	('model-s-mdzgholis-savarjeli', 'Model S მძღოლის სავარძელი (ტყავის)', 'მეორადი ტყავის სავარძელი მძღოლის მხარეს, კარგ მდგომარეობაში.', 3, 'model_s', 2015, 2020, 'used', 65000, 1, NULL, 'active', unixepoch(), unixepoch()),
	('model-x-haerbalishis-sensori', 'Model X ჰაერბალიშის სენსორი', 'ორიგინალი ჰაერბალიშის სენსორი, ტესტირებული და გამართული.', 4, 'model_x', 2017, 2022, 'used', 25000, 3, '1057743-00-C', 'active', unixepoch(), unixepoch()),
	('model-3-samukhruche-diskebi', 'Model 3 სამუხრუჭე დისკები, წინა (კომპლექტი)', 'ახალი წინა სამუხრუჭე დისკების კომპლექტი Model 3-სთვის.', 2, 'model_3', 2018, 2023, 'new', 32000, 5, NULL, 'active', unixepoch(), unixepoch()),
	('model-y-gverdis-sarke-marckhena', 'Model Y გვერდის სარკე, მარცხენა', 'მეორადი გვერდის სარკე ავტომატური დაბნელებით, კარგ მდგომარეობაში.', 1, 'model_y', 2020, 2024, 'used', 28000, 2, '1457423-00-D', 'active', unixepoch(), unixepoch()),
	('universal-usb-c-datmeni-kabeli', 'USB-C სამუხტი კაბელი (უნივერსალური)', 'ორიგინალი Tesla USB-C სამუხტი კაბელი, ყველა მოდელისთვის.', 6, 'universal', NULL, NULL, 'new', 4500, 10, NULL, 'active', unixepoch(), unixepoch()),
	('model-s-datmenis-porti', 'Model S დამტენის პორტი (Charge Port)', 'მეორადი დამტენის პორტის ბლოკი, გამართული.', 4, 'model_s', 2016, 2021, 'used', 38000, 1, NULL, 'active', unixepoch(), unixepoch());

INSERT INTO admin_users (email, password_hash) VALUES
	('admin@teslamarket.ge', 'pbkdf2$100000$tlhwL9kbekESOpVTu6pidA==$7u4v9U+xxV/5TqhsbgzU0/Gw+14nNzl+k0v+pYYY84w=');
