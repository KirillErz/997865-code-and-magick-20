'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 30;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_SPAN = 50;

var renderCloud = function (ctx, x, y, color, shadow) {
  if (shadow) {
    var move = 10;
    ctx.fillStyle = CLOUD_SHADOW_COLOR;
    ctx.fillRect(x + move, y + move, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var setText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  text.split('\n').forEach(function (line, i) {
    ctx.fillText(line, x, y + FONT_GAP * i);
  });
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderBar = function (ctx, x, y, nameBar, values) {
  var maxTime = getMaxElement(values);
  for (var i = 0; i < nameBar.length; i++) {
    var betweenLength = (BAR_SPAN + BAR_WIDTH) * i;
    var youColor = 'rgba(255, 0, 0, 1)';
    var saturation = (values[i] * 100) / maxTime;
    var themColor = 'hsl(240,' + saturation + '%,50%)';

    var color = (nameBar[i] === 'Вы') ? youColor : themColor;
    ctx.fillStyle = color;

    ctx.fillRect(x + betweenLength, y + (BAR_HEIGHT - (BAR_HEIGHT * values[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * values[i]) / maxTime);
    setText(ctx, nameBar[i], x + betweenLength, y + BAR_HEIGHT + 20);
    if (values[i] !== null) {
      ctx.fillText(Math.floor(values[i]), x + betweenLength, y + (BAR_HEIGHT - (BAR_HEIGHT * values[i]) / maxTime) - 10);
    }
  }
};

window.renderStatistics = function (ctx, names, times) {

  var message = 'Ура вы победили! \nСписок результатов:';

  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR, true);

  setText(ctx, message, CLOUD_X + GAP, CLOUD_Y + GAP);

  renderBar(ctx, CLOUD_X + GAP, (CLOUD_Y + CLOUD_HEIGHT - GAP) - BAR_HEIGHT, names, times);
};
