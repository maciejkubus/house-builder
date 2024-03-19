<!DOCTYPE html>
<html lang="pl">
	<head>
		<!-- META DATA -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>House builder</title>
		<!-- GOOGLE FONTS -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
		<!-- STYLES -->
		<link rel="stylesheet" href="style.css">
		<link rel="stylesheet" href="builder.css">
	</head>
	<body>
		<div class="house">
			<nav class="house-nav">
				<div class="house-nav-title">Krok</div>
				<ul class="house-nav-list">
					<li class="house-nav-step house-nav-step--active" data-step="1">1</li>
					<li class="house-nav-step" data-step="2">2</li>
				</ul>
			</nav>
			<div class="house-elements">
				<div class="house-element house-element-1 house-element--active" data-step="1">
					<div class="house-element-title"> Kształt </div>
				</div>
				<div class="house-element house-element-2" data-step="2">
					<div class="house-element-title"> Okna, drzwi, ściany </div>
				</div>
			</div>
		</div>
		<script src="steps.js"></script>
		<script src="builder.js"></script>
	</body>
</html>