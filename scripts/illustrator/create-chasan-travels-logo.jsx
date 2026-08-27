#target illustrator

/*
	Chasan Travels logo generator for Adobe Illustrator.
	Creates editable vector artwork on three artboards.
*/

(function () {
	var palette = {
		ink: rgb(16, 25, 23),
		paper: rgb(241, 237, 227),
		accent: rgb(169, 71, 49),
		focus: rgb(244, 189, 79)
	};

	var displayFont = findFont([
		'PalatinoLinotype-Roman',
		'Palatino-Roman',
		'Georgia',
		'TimesNewRomanPSMT'
	]);
	var metaFont = findFont([
		'AtkinsonHyperlegible-Regular',
		'ArialMT',
		'Helvetica'
	]);

	try {
		var doc = app.documents.add(DocumentColorSpace.RGB, 900, 280);
		configureArtboards(doc);

		var layer = doc.layers[0];
		layer.name = 'Chasan Travels logo';

		addWordmark(layer, 0, false, palette, displayFont, metaFont);
		addWordmark(layer, 960, true, palette, displayFont, metaFont);
		addMonogramBoard(layer, 1920, palette);

		doc.artboards.setActiveArtboardIndex(0);
		app.redraw();
		saveDocument(doc);
	} catch (error) {
		alert('Das Logo konnte nicht erstellt werden.\n\n' + error.message);
	}

	function configureArtboards(doc) {
		doc.artboards[0].artboardRect = [0, 280, 900, 0];
		doc.artboards[0].name = 'Wordmark light background';

		var darkBoard = doc.artboards.add([960, 280, 1860, 0]);
		darkBoard.name = 'Wordmark dark background';

		var markBoard = doc.artboards.add([1920, 280, 2200, 0]);
		markBoard.name = 'Monogram';
	}

	function addWordmark(layer, offsetX, isDark, colors, titleFont, labelFont) {
		var group = layer.groupItems.add();
		group.name = isDark ? 'Wordmark dark' : 'Wordmark light';

		if (isDark) {
			addBackground(group, offsetX, 280, 900, 280, colors.ink);
		}

		var primary = isDark ? colors.paper : colors.ink;
		var detail = isDark ? colors.focus : colors.accent;

		addMark(group, offsetX + 138, 140, 142, primary, detail);
		addText(group, offsetX + 250, 165, 'Chasan', 72, titleFont, primary, -18);
		addText(group, offsetX + 256, 103, 'TRAVELS', 17, labelFont, detail, 280);
	}

	function addMonogramBoard(layer, offsetX, colors) {
		var group = layer.groupItems.add();
		group.name = 'Monogram';
		addBackground(group, offsetX, 280, 280, 280, colors.ink);
		addMark(group, offsetX + 140, 140, 160, colors.paper, colors.focus);
	}

	function addMark(container, centerX, centerY, size, primary, detail) {
		var group = container.groupItems.add();
		group.name = 'CT route mark';

		var radius = size * 0.4;
		var weight = size * 0.065;
		addArc(group, centerX, centerY, radius, 45, 315, primary, weight);

		var barY = centerY + size * 0.13;
		addLine(
			group,
			centerX - size * 0.18,
			barY,
			centerX + size * 0.18,
			barY,
			primary,
			weight * 0.82
		);
		addLine(
			group,
			centerX,
			barY,
			centerX,
			centerY - size * 0.24,
			primary,
			weight * 0.82
		);

		var angle = 45 * Math.PI / 180;
		var dotX = centerX + radius * Math.cos(angle);
		var dotY = centerY + radius * Math.sin(angle);
		addDot(group, dotX, dotY, weight * 1.7, detail);
	}

	function addArc(container, centerX, centerY, radius, startDeg, endDeg, color, weight) {
		var path = container.pathItems.add();
		var span = endDeg - startDeg;
		var segmentCount = Math.ceil(Math.abs(span) / 90);
		var step = span / segmentCount;

		path.closed = false;
		path.filled = false;
		path.stroked = true;
		path.strokeColor = color;
		path.strokeWidth = weight;
		setRoundedStroke(path);

		for (var index = 0; index <= segmentCount; index++) {
			var angle = (startDeg + step * index) * Math.PI / 180;
			var anchor = [
				centerX + radius * Math.cos(angle),
				centerY + radius * Math.sin(angle)
			];
			var point = path.pathPoints.add();
			var inHandle = index === 0 ? 0 : arcHandle(radius, step);
			var outHandle = index === segmentCount ? 0 : arcHandle(radius, step);
			var tangentX = -Math.sin(angle);
			var tangentY = Math.cos(angle);

			point.anchor = anchor;
			point.leftDirection = [
				anchor[0] - tangentX * inHandle,
				anchor[1] - tangentY * inHandle
			];
			point.rightDirection = [
				anchor[0] + tangentX * outHandle,
				anchor[1] + tangentY * outHandle
			];
			point.pointType = PointType.SMOOTH;
		}
	}

	function arcHandle(radius, angleDeg) {
		return 4 / 3 * Math.tan(Math.abs(angleDeg) * Math.PI / 720) * radius;
	}

	function addLine(container, startX, startY, endX, endY, color, weight) {
		var line = container.pathItems.add();
		line.setEntirePath([[startX, startY], [endX, endY]]);
		line.closed = false;
		line.filled = false;
		line.stroked = true;
		line.strokeColor = color;
		line.strokeWidth = weight;
		setRoundedStroke(line);
		return line;
	}

	function setRoundedStroke(path) {
		try {
			path.strokeCap = StrokeCap.ROUNDENDCAP;
			path.strokeJoin = StrokeJoin.ROUNDENDJOIN;
		} catch (ignored) {
			// Older Illustrator versions keep their default stroke ends.
		}
	}

	function addDot(container, centerX, centerY, diameter, color) {
		var dot = container.pathItems.ellipse(
			centerY + diameter / 2,
			centerX - diameter / 2,
			diameter,
			diameter
		);
		dot.stroked = false;
		dot.filled = true;
		dot.fillColor = color;
		return dot;
	}

	function addBackground(container, left, top, width, height, color) {
		var background = container.pathItems.rectangle(top, left, width, height);
		background.name = 'Background';
		background.stroked = false;
		background.filled = true;
		background.fillColor = color;
		return background;
	}

	function addText(container, x, y, content, size, font, color, tracking) {
		var text = container.textFrames.add();
		text.contents = content;
		text.position = [x, y];
		text.textRange.characterAttributes.size = size;
		text.textRange.characterAttributes.textFont = font;
		text.textRange.characterAttributes.fillColor = color;
		text.textRange.characterAttributes.tracking = tracking;
		return text;
	}

	function findFont(names) {
		for (var index = 0; index < names.length; index++) {
			try {
				return app.textFonts.getByName(names[index]);
			} catch (ignored) {
				// Try the next installed font.
			}
		}
		return app.textFonts[0];
	}

	function rgb(red, green, blue) {
		var color = new RGBColor();
		color.red = red;
		color.green = green;
		color.blue = blue;
		return color;
	}

	function saveDocument(doc) {
		var target = File.saveDialog('Chasan Travels Logo als Illustrator-Datei speichern', '*.ai');
		if (!target) {
			alert('Das Logo wurde erstellt und bleibt ungespeichert in Illustrator geöffnet.');
			return;
		}

		if (!/\.ai$/i.test(target.name)) {
			target = new File(target.fsName + '.ai');
		}

		var options = new IllustratorSaveOptions();
		options.pdfCompatible = true;
		options.compressed = true;
		options.embedICCProfile = true;
		doc.saveAs(target, options);
		alert('Logo erstellt und gespeichert:\n' + target.fsName);
	}
})();
