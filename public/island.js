/* Ilha particular de cada jogador: gramada, com mansão moderna de dois andares, TV na sala, piscina e área de churrasco. */
function buildIsland(S, W) {
  var I = W.ILHA, G0 = new THREE.Group(), solid = []; G0.visible = false; S.add(G0);
  function Mt(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
  var WOOD = Mt(0x9a6b42), DARK = Mt(0x4a3322), STONE = Mt(0x7c7a76), GOLD = Mt(0xd9b25a), LEAF = Mt(0x2f8f4e),
    TRAV = Mt(0xe6dccb), TRAV2 = Mt(0xcdbfa6), BLK = Mt(0x17191d), ROOF = Mt(0x2b2d32), WHITE = Mt(0xf8fafc),
    GLASS = Mt(0x24323f, { emissive: 0x7a5424 }), RAIL = Mt(0xbfe3f0, { transparent: true, opacity: .3 }),
    LAMP = new THREE.MeshBasicMaterial({ color: 0xffe2a8 });
  function mesh(g, m, x, y, z) { var o = new THREE.Mesh(g, m); o.position.set(x || 0, y || 0, z || 0); G0.add(o); return o; }
  function bx(w, h, d, m, x, y, z) { return mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z); }
  function sol(w, h, d, m, x, y, z) { var o = bx(w, h, d, m, x, y, z); solid.push(o); return o; }
  function cy(r1, r2, h, m, x, y, z, n) { return mesh(new THREE.CylinderGeometry(r1, r2, h, n || 12), m, x, y, z); }
  function blob(rx, rz, w) { var s = new THREE.Shape(), n = 72; for (var i = 0; i <= n; i++) { var a = i / n * 6.2832, r = 1 + w * (Math.sin(a * 3 + 1) * .5 + Math.sin(a * 5) * .3), x = Math.cos(a) * rx * r, z = Math.sin(a) * rz * r; i ? s.lineTo(x, z) : s.moveTo(x, z); } return s; }
  function ext(s, h, m, y) { var o = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }), m); o.rotation.x = -Math.PI / 2; o.position.y = y; G0.add(o); return o; }
  ext(blob(I.RX + 1.6, I.RZ + 1.4, .05), 2.8, Mt(0x35622f), -2.8); ext(blob(I.RX + 1, I.RZ + 1, .04), .06, Mt(0x4b8c47), -.1);
  // PRAIA em volta da ilha: areia que desce devagar até o mar, água clara rasa e espuma na beirada
  var beach = mesh(new THREE.CylinderGeometry(1, 1.55, 3.45, 64, 1), Mt(0xe9d6a4), 0, -1.775, 0); beach.scale.set(I.RX + 4.5, 1, I.RZ + 4);
  var lag = mesh(new THREE.CircleGeometry(1, 64), new THREE.MeshBasicMaterial({ color: 0x35c9d1, transparent: true, opacity: .55 }), 0, -3.46, 0); lag.rotation.x = -Math.PI / 2; lag.scale.set((I.RX + 4.5) * 1.75, (I.RZ + 4) * 1.75, 1);
  var foam = mesh(new THREE.RingGeometry(.985, 1, 64), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .6, side: THREE.DoubleSide }), 0, -3.44, 0); foam.rotation.x = -Math.PI / 2; foam.scale.set((I.RX + 4.5) * 1.55, (I.RZ + 4) * 1.55, 1);
  // caminho de pedras
  [[0, 3.4], [.5, 5], [-.4, 6.6], [1.2, 12.2], [.3, 13.8], [-.4, 15.3]].forEach(function (q) { var s = cy(.62, .68, .05, STONE, q[0], .012, q[1], 9); s.scale.z = .8; });
  function vaso(x, z, s) { s = s || 1; cy(.42 * s, .3 * s, .7 * s, Mt(0xb66a3c), x, .35 * s, z, 12); for (var i = 0; i < 8; i++) { var a = i / 8 * 6.283, l = mesh(new THREE.SphereGeometry(.55 * s, 6, 4), LEAF, x + Math.cos(a) * .4 * s, 1.05 * s, z + Math.sin(a) * .4 * s); l.scale.set(1.3, .22, .45); l.rotation.y = -a; l.rotation.z = -.5; } }
  var i;
  [[-22.5, 9.5, 0xef4444], [22.5, 10, 0x3b82f6], [-17, 17.5, 0xfacc15]].forEach(function (q, n) { cy(.04, .04, 2.6, DARK, q[0], 1.3, q[1], 6); mesh(new THREE.ConeGeometry(1.6, .6, 10), Mt(q[2]), q[0], 2.6, q[1]); var tw = bx(1, .03, 2.2, Mt([0xffffff, 0xf472b6, 0x22c55e][n]), q[0] + .4, .02, q[1] + .9); tw.rotation.y = .3; });

  // ===== MANSÃO: paredes de pedra clara, vidros grandes, porta preta e luzes na fachada =====
  var H = 3.6;
  sol(20.3, H, .3, TRAV, 0, H / 2, -11); sol(.3, H, 8.3, TRAV, -10, H / 2, -7); sol(.3, H, 8.3, TRAV, 10, H / 2, -7); sol(8.4, H, .3, TRAV, -5.8, H / 2, -3); sol(8.4, H, .3, TRAV, 5.8, H / 2, -3); bx(3.5, .8, .3, TRAV, 0, H - .4, -3);
  [-1.72, 1.72].forEach(function (x) { bx(.2, H, .42, BLK, x, H / 2, -2.95); }); bx(3.7, .18, .42, BLK, 0, H - .8, -2.95);
  [-6.2, 6.2].forEach(function (x) { bx(5.4, 2.5, .06, GLASS, x, 1.5, -2.82); [-2.7, -1.35, 0, 1.35, 2.7].forEach(function (d) { bx(.07, 2.5, .09, BLK, x + d, 1.5, -2.8); }); bx(5.5, .08, .09, BLK, x, 2.76, -2.8); bx(5.5, .08, .09, BLK, x, .24, -2.8); });
  [-9.5, -2.8, 2.8, 9.5].forEach(function (x) { bx(.16, 1.1, .08, LAMP, x, 1.9, -2.8); bx(.24, 1.2, .05, BLK, x, 1.9, -2.83); });
  bx(19.7, .02, 7.7, Mt(0xc9a77c), 0, .015, -7); bx(24, .03, 6.2, Mt(0xd3cabb), 0, .02, .05);
  // teto de dentro, laje escura do segundo andar que também é a varanda de cima
  bx(19.7, .02, 8.2, Mt(0xf4efe4), 0, H - .012, -7); sol(24.4, .3, 14.7, ROOF, 0, H + .15, -3.95);
  // segundo andar com janelas de vidro e telhado plano escuro
  sol(17.6, 3, 5.6, TRAV, 0, H + 1.8, -7.8);
  [-4.6, 4.6].forEach(function (x) { bx(5.6, 2.2, .06, GLASS, x, H + 1.55, -4.97); [-2.8, -1.4, 0, 1.4, 2.8].forEach(function (d) { bx(.07, 2.2, .09, BLK, x + d, H + 1.55, -4.95); }); bx(5.7, .08, .09, BLK, x, H + 2.68, -4.95); bx(5.7, .08, .09, BLK, x, H + .46, -4.95); });
  bx(19.2, .3, 7.4, ROOF, 0, H + 3.45, -7.8);
  // varanda de cima com guarda-corpo de vidro
  bx(24.2, 1, .04, RAIL, 0, H + .8, 3.3); bx(24.2, .06, .08, BLK, 0, H + 1.3, 3.3); [-12.1, 12.1].forEach(function (x) { bx(.04, 1, 8.4, RAIL, x, H + .8, -.9); bx(.08, .06, 8.4, BLK, x, H + 1.3, -.9); });
  [-12.1, -6.05, 0, 6.05, 12.1].forEach(function (x) { bx(.08, 1, .08, BLK, x, H + .8, 3.3); });
  // colunas e luzinhas embutidas no teto da varanda
  [-9.6, -4.8, 4.8, 9.6].forEach(function (x) { bx(.34, H, .34, TRAV2, x, H / 2, 2.6); });
  [-9, -6, -3, 3, 6, 9].forEach(function (x) { [.4, 2.1].forEach(function (z) { cy(.1, .1, .02, LAMP, x, H - .02, z, 10); }); });
  // varanda da frente: sofás e mesinhas olhando o mar
  function sofa(x) { bx(4.2, .5, 1.5, WOOD, x, .25, -1.6); bx(4.1, .22, 1.4, Mt(0x2a6f97), x, .6, -1.6); bx(4.1, .75, .36, Mt(0x1b7f86), x, .92, -2.2); [-1.2, 0, 1.2].forEach(function (d) { bx(.8, .42, .18, GOLD, x + d, .95, -1.98); }); cy(.55, .55, .07, WOOD, x, .55, .9, 18); cy(.07, .08, .55, DARK, x, .27, .9, 8); [0xe5484d, 0xf59e0b].forEach(function (c, k) { mesh(new THREE.SphereGeometry(.09, 8, 6), Mt(c), x + (k - .5) * .24, .68, .9); }); cy(.05, .06, .22, Mt(0xdcecff), x + .3, .68, 1.1, 8); }
  sofa(-6.2); sofa(6.2);
  vaso(-2.4, 2.2, 1.1); vaso(2.4, 2.2, 1.1); vaso(-11.2, -2.4); vaso(11.2, -2.4);
  // jardim da frente: sebes, luzinhas no caminho
  [-6.2, 6.2].forEach(function (x) { bx(6, .75, .8, Mt(0x2f7d3e), x, .38, 3.6); bx(5.9, .1, .7, Mt(0x3b9a4a), x, .78, 3.6); });
  [[-1.6, 4.6], [1.6, 4.6], [-1.6, 7.4], [1.6, 7.4]].forEach(function (q) { cy(.04, .04, .6, DARK, q[0], .3, q[1], 6); mesh(new THREE.SphereGeometry(.1, 8, 6), LAMP, q[0], .66, q[1]); });
  var pl = new THREE.PointLight(0xffd9a0, 1.3, 26, 1.3); pl.position.set(0, 2.9, -5); G0.add(pl);

  // ===== SALA: TV grande, sofá, tapete e mesinha =====
  bx(5.4, 3.05, .12, BLK, -3.5, 2.08, -10.79); bx(5.6, .55, .6, Mt(0x3a2a1e), -3.5, .28, -10.5); bx(5.5, .04, .5, Mt(0x6b4a2e), -3.5, .57, -10.5);
  bx(6.4, .012, 4.4, Mt(0x3b4a5c), -3.5, .03, -7.6);
  bx(4.8, .45, 1.1, Mt(0x5b5f66), -3.5, .25, -5.55); bx(4.6, .2, .95, Mt(0x7b8089), -3.5, .55, -5.5); bx(4.8, .75, .3, Mt(0x5b5f66), -3.5, .85, -5.05); [-2.45, 2.45].forEach(function (d) { bx(.3, .62, 1.1, Mt(0x4b4f56), -3.5 + d, .5, -5.55); });
  [[-4.6, 0xf59e0b], [-2.4, 0x38bdf8]].forEach(function (q) { bx(.5, .4, .14, Mt(q[1]), q[0], .85, -5.3); });
  bx(2.4, .1, 1, Mt(0x2b2b2e), -3.5, .45, -8.1); [-1.05, 1.05].forEach(function (dx) { [-.4, .4].forEach(function (dz) { bx(.08, .4, .08, BLK, -3.5 + dx, .22, -8.1 + dz); }); }); cy(.14, .14, .12, WHITE, -3.8, .56, -8.1, 12); mesh(new THREE.SphereGeometry(.12, 8, 6), Mt(0xe5484d), -3.2, .6, -8.1);
  vaso(-.5, -10.3, .8); vaso(-6.1, -4.1, .75);
  // quadros na parede da sala e do quarto
  [[9.84, 2.0, -5.2, -1.57, 0xf472b6], [-9.84, 2.1, -3.9, 1.57, 0x38bdf8]].forEach(function (q) { var o = bx(.05, 1.1, 1.8, Mt(0x2b2b2e), q[0], q[1], q[2]), p2 = bx(.07, .9, 1.6, new THREE.MeshBasicMaterial({ color: q[4] }), q[0], q[1], q[2]); });

  // ===== BANHEIRO (canto de trás à esquerda) =====
  bx(.3, H, 3.8, TRAV2, -6.5, H / 2, -9.1); bx(2.2, H, .3, TRAV2, -8.9, H / 2, -7.2); bx(3.5, .012, 3.6, Mt(0xdbeafe), -8.1, .03, -9.1);
  cy(.28, .22, .42, WHITE, -9.2, .21, -10.35, 14); bx(.56, .55, .22, WHITE, -9.2, .62, -10.68); bx(.6, .05, .5, Mt(0xe5e7eb), -9.2, .44, -10.35);
  cy(.5, .5, .04, Mt(0x93c5fd), -7.3, .06, -10.2, 16); cy(.05, .05, 2.1, Mt(0x9ca3af), -7.3, 1.05, -10.75, 8); cy(.2, .14, .08, Mt(0x9ca3af), -7.3, 2.1, -10.55, 12); bx(.04, 2.2, 1.5, RAIL, -8.2, 1.1, -10.1);

  // ===== QUARTO (esquerda): cama de casal =====
  bx(3.2, .5, 2.4, Mt(0x3a2a1e), -8.25, .25, -4.9); bx(3, .25, 2.2, WHITE, -8.25, .62, -4.9); bx(1.9, .08, 2.25, Mt(0x2f4156), -7.6, .78, -4.9); bx(.2, 1.2, 2.5, Mt(0x3a2a1e), -9.8, .8, -4.9);
  [-5.3, -4.5].forEach(function (z) { bx(.6, .15, .8, Mt(0xf1f5f9), -9.4, .82, z); });

  // ===== COZINHA (direita): balcão, fogão, pia, geladeira e mesa de jantar =====
  bx(5, .9, 1, Mt(0xf1efe9), 6, .45, -10.35); bx(5.1, .06, 1.06, Mt(0x2f2f33), 6, .93, -10.35); bx(5, .8, .4, Mt(0xe7e0d2), 6, 2.5, -10.65);
  bx(.9, .04, .7, BLK, 4.8, .97, -10.35); [-.2, .2].forEach(function (dx) { [-.15, .15].forEach(function (dz) { cy(.1, .1, .03, Mt(0x9ca3af), 4.8 + dx, 1, -10.35 + dz, 12); }); }); cy(.2, .17, .28, Mt(0xdc2626), 4.7, 1.15, -10.5, 12);
  bx(.8, .04, .55, Mt(0x94a3b8), 6.4, .97, -10.35); cy(.03, .03, .34, Mt(0xcbd5e1), 6.4, 1.15, -10.65, 8); bx(.03, .03, .3, Mt(0xcbd5e1), 6.4, 1.3, -10.52);
  bx(1.2, 2.4, 1.1, Mt(0xcbd5e1), 9.2, 1.2, -10.3); bx(.05, .9, .05, Mt(0x64748b), 8.58, 1.5, -9.8);
  bx(2.8, .08, 1.8, WOOD, 6.6, .75, -6.1); [-1.2, 1.2].forEach(function (dx) { [-.7, .7].forEach(function (dz) { bx(.1, .75, .1, DARK, 6.6 + dx, .37, -6.1 + dz); }); });
  [[5.7, -7.5], [7.5, -7.5], [5.7, -4.7], [7.5, -4.7]].forEach(function (q) { bx(.5, .45, .5, Mt(0x2b2b2e), q[0], .25, q[1]); bx(.5, .5, .08, Mt(0x2b2b2e), q[0], .72, q[1] + (q[1] < -6 ? -.22 : .22)); });
  cy(.015, .015, .6, DARK, 6.6, H - .3, -6.1, 6); cy(.45, .3, .25, new THREE.MeshBasicMaterial({ color: 0xfff1c2 }), 6.6, H - .75, -6.1, 16);

  // ===== PISCINA com deck de madeira, espreguiçadeiras e ombrelone =====
  bx(8.4, .03, 6.4, Mt(0xa07850), -16.2, .03, 2.6);
  var CP = Mt(0xe9e3d6); bx(6.3, .14, .25, CP, -15.9, .07, .475); bx(6.3, .14, .25, CP, -15.9, .07, 4.325); bx(.25, .14, 4.1, CP, -18.925, .07, 2.4); bx(.25, .14, 4.1, CP, -12.875, .07, 2.4);
  bx(5.8, .01, 3.6, new THREE.MeshBasicMaterial({ color: 0x2fc3e6 }), -15.9, .08, 2.4); bx(5.8, .005, 3.6, new THREE.MeshBasicMaterial({ color: 0x9be9ff, transparent: true, opacity: .25 }), -15.9, .088, 2.4);
  var pw = new THREE.PointLight(0x2fd4ff, 1.1, 11, 1.5); pw.position.set(-15.9, .7, 2.4); G0.add(pw);
  [-18.6, -15.6].forEach(function (x) { bx(2.2, .1, .8, Mt(0x3a2a1e), x, .3, 5.1); bx(1.5, .12, .78, WHITE, x + .35, .42, 5.1); var bk = bx(.8, .12, .78, WHITE, x - .75, .52, 5.1); bk.rotation.z = -.45; [-.9, .9].forEach(function (dx) { bx(.06, .3, .7, DARK, x + dx, .15, 5.1); }); });
  cy(.3, .3, .05, WHITE, -17.1, .55, 5.1, 14); cy(.04, .04, 2.6, DARK, -17.1, 1.3, 5.1, 6); mesh(new THREE.ConeGeometry(1.9, .6, 10), Mt(0xf5f0e6), -17.1, 2.7, 5.1);

  // ===== ÁREA DE CHURRASCO com pergolado (lado direito) =====
  [[12.5, -9], [19.5, -9], [12.5, -4.5], [19.5, -4.5]].forEach(function (q) { bx(.25, 3, .25, DARK, q[0], 1.5, q[1]); });
  bx(.2, .2, 5.2, DARK, 12.5, 3.05, -6.75); bx(.2, .2, 5.2, DARK, 19.5, 3.05, -6.75); for (i = 0; i < 11; i++) bx(7.4, .1, .14, DARK, 16, 3.17, -9.1 + i * .46);
  bx(6.2, .9, .9, Mt(0x5a5550), 16, .45, -10.45); bx(6.3, .06, 1, Mt(0xd6cfc2), 16, .93, -10.45); bx(1.1, .3, .7, BLK, 14.2, 1.1, -10.45); bx(1.1, .06, .74, Mt(0x374151), 14.2, 1.3, -10.45);
  bx(.8, .04, .55, Mt(0x94a3b8), 17.4, .97, -10.45); bx(1.2, 2.4, 1.1, Mt(0xcbd5e1), 19.1, 1.2, -10.4);
  bx(2.8, .08, 1.2, WOOD, 16, .75, -7.1); [-1.2, 1.2].forEach(function (dx) { [-.45, .45].forEach(function (dz) { bx(.1, .75, .1, DARK, 16 + dx, .37, -7.1 + dz); }); });
  [[14.9, -8.3], [17.1, -8.3], [14.9, -5.9], [17.1, -5.9]].forEach(function (q) { bx(.5, .45, .5, Mt(0x2b2b2e), q[0], .25, q[1]); });
  var gl = new THREE.PointLight(0xffd9a0, .6, 10, 1.6); gl.position.set(16, 2.8, -7); G0.add(gl);

  // palmeiras e luzinhas
  var pts = []; function palm(x, z, s) { var t = cy(.2 * s, .38 * s, 8 * s, Mt(0x7a5a3a), x, 4 * s, z, 8); t.rotation.z = (x > 0 ? -1 : 1) * .05; for (var i = 0; i < 9; i++) { var a = i / 9 * 6.283, f = mesh(new THREE.SphereGeometry(1, 8, 6), LEAF, x + Math.cos(a) * 2.3 * s, 8 * s, z + Math.sin(a) * 2.3 * s); f.scale.set(2.8 * s, .13, .6 * s); f.rotation.y = -a; f.rotation.z = -.5; } for (i = 0; i < 14; i++) { var h = .5 + i * .52 * s, an = i * 1.5; pts.push([x + Math.cos(an) * .4, h, z + Math.sin(an) * .4]); } }
  I.PALMS.forEach(function (q) { palm(q[0], q[1], q[2]); });
  function line(a, b, n, sag) { for (var i = 0; i <= n; i++) { var f = i / n; pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f - Math.sin(f * 3.14) * sag, a[2] + (b[2] - a[2]) * f]); } }
  line([-12.1, H + .3, 3.3], [12.1, H + .3, 3.3], 40, 0); line([-1.2, 2, 16], [-1.2, 2, 34], 24, .1); line([1.2, 2, 16], [1.2, 2, 34], 24, .1); line([12.5, 2.9, -4.5], [19.5, 2.9, -4.5], 14, .3); line([-20, 2.4, -.6], [-12.4, 2.4, -.6], 14, .3);
  var cols = [0xffe6a8, 0xff7ad9, 0x6fe9ff, 0xffe6a8, 0xb98cff], im = new THREE.InstancedMesh(new THREE.SphereGeometry(.06, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }), pts.length), mx = new THREE.Matrix4(), cc = new THREE.Color(); pts.forEach(function (p, k) { mx.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(k, mx); im.setColorAt(k, cc.setHex(cols[k % 5])); }); im.frustumCulled = false; G0.add(im);
  // flores (fora da casa, da piscina e do caminho)
  var fl = []; for (i = 0; i < 240; i++) { var a = Math.random() * 6.283, r0 = .55 + Math.random() * .4, x = Math.cos(a) * I.RX * r0, z = Math.sin(a) * I.RZ * r0; if (z < 4.4 && Math.abs(x) < 13) continue; if (Math.abs(x) < 2 && z > 2) continue; if (x < -11.5 && x > -21 && z > -1.2 && z < 6.4) continue; if (x > 11.5 && x < 20.5 && z < -3) continue; fl.push([x, z]); }
  var fm = new THREE.InstancedMesh(new THREE.SphereGeometry(.075, 6, 4), new THREE.MeshLambertMaterial({ color: 0xffffff }), fl.length), fc = [0xff6fae, 0xfacc15, 0xffffff, 0xa78bfa, 0xfb7185]; fl.forEach(function (p, k) { mx.makeTranslation(p[0], .12, p[1]); fm.setMatrixAt(k, mx); fm.setColorAt(k, cc.setHex(fc[k % 5])); }); G0.add(fm);
  // fogueira com bancos de tronco
  var P = I.FIRE; for (i = 0; i < 12; i++) { var b = i / 12 * 6.283; mesh(new THREE.DodecahedronGeometry(.27), STONE, P.x + Math.cos(b) * 1, .17, P.z + Math.sin(b) * 1); } var fire = mesh(new THREE.ConeGeometry(.5, 1.25, 8), new THREE.MeshBasicMaterial({ color: 0xffa02a }), P.x, .68, P.z), f2 = mesh(new THREE.ConeGeometry(.28, .8, 8), new THREE.MeshBasicMaterial({ color: 0xffe36a }), P.x, .55, P.z); var fl2 = new THREE.PointLight(0xffa24d, 1.6, 15, 1.5); fl2.position.set(P.x, 1.5, P.z); G0.add(fl2);
  I.SEATS.forEach(function (s) { if (s.st) cy(.36, .4, .46, DARK, s.x, .23, s.z, 10); });
  // rede entre duas palmeiras
  [-1, 1].forEach(function (k) { var ox = I.HAM.x + k * 1.95 * .825, oz = I.HAM.z + k * 1.95 * .565; cy(.08, .1, 1.7, DARK, ox, .85, oz, 8); var rp = bx(.34, .03, .5, Mt(0xfff1cf), I.HAM.x + k * 1.85 * .825, 1.05, I.HAM.z + k * 1.85 * .565); rp.rotation.y = -.6; });
  var hm = bx(3.6, .1, 1.1, Mt(0xe36b4a), I.HAM.x, .85, I.HAM.z); hm.rotation.y = -.6; for (i = 0; i < 6; i++) { var s2 = bx(.08, .11, 1.12, Mt(0xfff1cf), I.HAM.x + Math.cos(.6) * (-1.5 + i * .6), .85, I.HAM.z + Math.sin(.6) * (-1.5 + i * .6)); s2.rotation.y = -.6; }
  // píer, barquinho e placa
  bx(2.6, .15, 19, WOOD, 0, .07, 24.5); for (i = 0; i < 38; i++) bx(2.62, .02, .05, DARK, 0, .16, 15.2 + i * .5); [-1.2, 1.2].forEach(function (x) { [17, 21, 25, 29, 33].forEach(function (z) { cy(.1, .1, 4, DARK, x, -1.2, z, 6); cy(.1, .1, 1.1, DARK, x, .55, z, 6); }); });
  var bt = new THREE.Shape(); bt.moveTo(-3, -.9); bt.lineTo(1.8, -.9); bt.quadraticCurveTo(3.1, 0, 3.4, 0); bt.quadraticCurveTo(3.1, 0, 1.8, .9); bt.lineTo(-3, .9); bt.closePath(); var bo = new THREE.Mesh(new THREE.ExtrudeGeometry(bt, { depth: .75, bevelEnabled: false }), Mt(0xf7f8fa)); bo.rotation.x = -Math.PI / 2; bo.position.set(4.2, -3.1, 33); G0.add(bo); bx(4.4, .1, 1.5, WOOD, 3.6, -2.3, 33);
  // placa com o nome do dono
  var sc = document.createElement('canvas'); sc.width = 512; sc.height = 160; var sx = sc.getContext('2d'), st = new THREE.CanvasTexture(sc), sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.12), new THREE.MeshBasicMaterial({ map: st })); sign.position.set(-2.8, 1.9, 13.6); sign.rotation.y = .1; G0.add(sign); bx(3.75, 1.26, .1, DARK, -2.8, 1.9, 13.54).rotation.y = .1; [-4.3, -1.3].forEach(function (x) { cy(.09, .09, 2, DARK, x, 1, 13.5, 6); });
  function setName(n) { sx.fillStyle = '#6d4324'; sx.fillRect(0, 0, 512, 160); sx.fillStyle = '#fff1cf'; sx.textAlign = 'center'; sx.font = '700 34px Georgia,serif'; sx.fillText('Ilha particular de', 256, 58); sx.font = '800 54px Georgia,serif'; sx.fillText(String(n).slice(0, 18), 256, 122); st.needsUpdate = true; }
  return { group: G0, solid: solid, setName: setName, fire: [fire, f2] };
}
/* ilhas vizinhas: dá para ver as casas de longe, mas só se entra na ilha de outra pessoa com convite */
function buildNeighbors(S, W) {
  var G1 = new THREE.Group(), tags = [], rock = new THREE.MeshLambertMaterial({ color: 0x4d4a48 }), grass = new THREE.MeshLambertMaterial({ color: 0x3f7d45 }), wall = new THREE.MeshLambertMaterial({ color: 0xe6dccb }), roof = new THREE.MeshLambertMaterial({ color: 0xa98a54 }), deck = new THREE.MeshLambertMaterial({ color: 0x9a6b42 }), trunk = new THREE.MeshLambertMaterial({ color: 0x7a5a3a }), leaf = new THREE.MeshLambertMaterial({ color: 0x2f8f4e }), glow = new THREE.MeshBasicMaterial({ color: 0xffd28a }), S2 = new THREE.CircleGeometry(1, 28), bd = new THREE.CylinderGeometry(1, 1.08, 1, 28);
  var rg = new THREE.Shape(); rg.moveTo(-1, 0); rg.lineTo(1, 0); rg.lineTo(0, .46); rg.closePath(); var rfg = new THREE.ExtrudeGeometry(rg, { depth: 1, bevelEnabled: false }); rfg.translate(0, 0, -.5);
  var sandM = new THREE.MeshLambertMaterial({ color: 0xe9d6a4 }), sandG = new THREE.CylinderGeometry(1, 1.55, 3.45, 40, 1), lagM = new THREE.MeshBasicMaterial({ color: 0x35c9d1, transparent: true, opacity: .55 }), dark = new THREE.MeshLambertMaterial({ color: 0x2b2d32 }), poolM = new THREE.MeshBasicMaterial({ color: 0x2fc3e6 }); S.add(G1);
  W.NEAR.forEach(function (q, i) {
    var g = new THREE.Group(); g.position.set(q.x, 0, q.z); g.rotation.y = q.ry; G1.add(g); var s = q.s;
    var base = new THREE.Mesh(bd, rock); base.scale.set(26 * s, 3.6, 18.6 * s); base.position.y = -2.1; g.add(base); var sd = new THREE.Mesh(sandG, sandM); sd.scale.set(28 * s, 1, 19.8 * s); sd.position.y = -1.775; g.add(sd); var lg = new THREE.Mesh(S2, lagM); lg.rotation.x = -Math.PI / 2; lg.scale.set(49 * s, 34.6 * s, 1); lg.position.y = -3.46; g.add(lg); var top = new THREE.Mesh(bd, grass); top.scale.set(24 * s, .6, 17 * s); top.position.y = -.3; g.add(top);
    var ho = new THREE.Mesh(new THREE.BoxGeometry(20 * s, 3.6, 8.2 * s), wall); ho.position.set(0, 1.8, -7 * s); g.add(ho); var up = new THREE.Mesh(new THREE.BoxGeometry(17.6 * s, 3, 5.6 * s), wall); up.position.set(0, 5.4, -7.8 * s); g.add(up);
    var lj = new THREE.Mesh(new THREE.BoxGeometry(24.4 * s, .3, 14.7 * s), dark); lj.position.set(0, 3.75, -3.95 * s); g.add(lj); var tt = new THREE.Mesh(new THREE.BoxGeometry(19.2 * s, .3, 7.4 * s), dark); tt.position.set(0, 7.05, -7.8 * s); g.add(tt);
    var dc = new THREE.Mesh(new THREE.BoxGeometry(24 * s, .12, 6.2 * s), deck); dc.position.set(0, .06, .05 * s); g.add(dc); var pi = new THREE.Mesh(new THREE.BoxGeometry(5.8 * s, .06, 3.6 * s), poolM); pi.position.set(-15.9 * s, .12, 2.4 * s); g.add(pi);
    [-6.2, 6.2].forEach(function (x) { var w = new THREE.Mesh(new THREE.BoxGeometry(5.4 * s, 2.5, .1), glow); w.position.set(x * s, 1.5, -2.92 * s); g.add(w); }); [-4.6, 4.6].forEach(function (x) { var w = new THREE.Mesh(new THREE.BoxGeometry(5.6 * s, 2.2, .1), glow); w.position.set(x * s, 5.15, -5.05 * s); g.add(w); });
    [[-14, 7], [14, 6], [-16, -5], [16, -7]].forEach(function (p, k) { var t = new THREE.Mesh(new THREE.CylinderGeometry(.2, .38, 8, 6), trunk); t.position.set(p[0] * s, 4, p[1] * s); g.add(t); var c = new THREE.Mesh(new THREE.SphereGeometry(2.6, 7, 4), leaf); c.scale.y = .28; c.position.set(p[0] * s, 8.2, p[1] * s); g.add(c); });
    var lc = document.createElement('canvas'); lc.width = 512; lc.height = 96; var lt = new THREE.CanvasTexture(lc), sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt, transparent: true, depthWrite: false, fog: false })); sp.position.set(q.x, 15, q.z); sp.scale.set(28, 5.3, 1); sp.visible = false; G1.add(sp); tags.push({ c: lc, t: lt, s: sp });
  });
  return function setNames(names) { tags.forEach(function (o, i) { var n = names[i]; o.s.visible = !!n; if (!n) return; var x = o.c.getContext('2d'); x.clearRect(0, 0, 512, 96); x.fillStyle = 'rgba(14,10,34,.8)'; x.fillRect(0, 8, 512, 80); x.fillStyle = '#fff'; x.font = '700 42px sans-serif'; x.textAlign = 'center'; x.fillText('Casa de ' + String(n).slice(0, 14), 256, 64); o.t.needsUpdate = true; }); };
}
/* mercadinho: lugar aberto para todos, em uma plataforma no mar */
function buildMarket(S, W) {
  var G2 = new THREE.Group(), solid = []; G2.visible = false; S.add(G2); var K = W.MERC;
  function Mt(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
  function bx(w, h, d, m, x, y, z) { var o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); G2.add(o); return o; }
  function sol(w, h, d, m, x, y, z) { var o = bx(w, h, d, m, x, y, z); solid.push(o); return o; }
  var WOOD = Mt(0x9a6b42), DARK = Mt(0x5b3a22), WALL = Mt(0xf3efe6), RED = Mt(0xd9483b), H = 3.6;
  bx(K.W * 2, 2.8, K.D * 2, Mt(0x4d4a48), 0, -1.45, 0); bx(K.W * 2, .05, K.D * 2, WOOD, 0, 0, 0); for (var i = 0; i < 16; i++) bx(.04, .06, K.D * 2, DARK, -K.W + i * (K.W * 2 / 15), .002, 0);
  sol(20, H, .3, WALL, 0, H / 2, -10); sol(.3, H, 8, WALL, -10, H / 2, -6); sol(.3, H, 8, WALL, 10, H / 2, -6); sol(7.5, H, .3, WALL, -6.3, H / 2, -2); sol(7.5, H, .3, WALL, 6.3, H / 2, -2); bx(20.6, .3, 8.6, RED, 0, H + .15, -6); bx(5, .9, .3, WALL, 0, H - .45, -2);
  bx(20, .012, 8, Mt(0xd9d2c4), 0, .03, -6); var lt = new THREE.PointLight(0xfff0d0, 1.3, 20, 1.4); lt.position.set(0, 3, -6); G2.add(lt); bx(1.2, .06, .6, new THREE.MeshBasicMaterial({ color: 0xfff6dc }), 0, H - .05, -6);
  var cols = [0xe5484d, 0x3b82f6, 0x22c55e, 0xf59e0b, 0xec4899, 0x06b6d4];
  (function () {                                                     // prateleiras abertas com os produtos à mostra
    var woodS = Mt(0xc98f55), L = { s: [], b: [], c: [], k: [] }, MX = new THREE.Matrix4(), QT = new THREE.Quaternion(), V1 = new THREE.Vector3(), V2 = new THREE.Vector3();
    function put(t, x, y, z, sx, sy, sz, c) { L[t].push([x, y, z, sx, sy, sz, c]); }
    function item(n, x, y, z, i) { var w = i % 4;
      if (n === 0) { if (w === 0) put('s', x, y + .13, z, .14, .14, .14, [0xef4444, 0xdc2626][i % 2]); else if (w === 1) put('k', x, y + .15, z, .07, .3, .07, 0xf97316); else if (w === 2) put('s', x, y + .15, z, .17, .15, .17, 0x65a30d); else put('s', x, y + .1, z, .2, .08, .08, 0xfacc15); }
      else if (n === 1) { if (w === 0) put('b', x, y + .2, z, .28, .4, .18, 0xfafafa); else if (w === 1) put('b', x, y + .17, z, .28, .34, .18, 0x92400e); else if (w === 2) put('b', x, y + .22, z, .2, .44, .2, 0x60a5fa); else put('b', x, y + .15, z, .3, .3, .2, 0xfbbf24); }
      else if (n === 2) { put('c', x, y + .18, z, .09, .36, .09, [0x22c55e, 0xef4444, 0xf97316, 0x38bdf8][w]); put('c', x, y + .42, z, .04, .14, .04, 0xffffff); }
      else { put('b', x, y + .17, z, .3, .34, .14, [0xec4899, 0x7c3aed, 0xf59e0b, 0x16a34a][w]); put('b', x, y + .4, z, .22, .08, .1, 0x7c2d12); } }
    K.SHELF.forEach(function (q, n) { var w = q[2] - q[0], cx = (q[0] + q[2]) / 2, cz = (q[1] + q[3]) / 2; bx(w, 2, .08, woodS, cx, 1, cz); [-1, 1].forEach(function (sd) { [.3, .85, 1.4].forEach(function (y) { bx(w, .05, .4, woodS, cx, y, cz + sd * .24); for (var i = 0, m = Math.floor(w / .4); i < m; i++) item(n, q[0] + .25 + i * .4, y + .03, cz + sd * .25, i + Math.round(y * 3)); }); bx(w, .28, .04, Mt(n === 0 ? 0x166534 : n === 1 ? 0xb45309 : n === 2 ? 0x0369a1 : 0xbe185d), cx, .14, cz + sd * .44); }); [-w / 2, w / 2].forEach(function (d) { bx(.08, 2, .86, woodS, cx + d, 1, cz); }); });
    [['s', new THREE.SphereGeometry(1, 10, 8)], ['b', new THREE.BoxGeometry(1, 1, 1)], ['c', new THREE.CylinderGeometry(1, 1, 1, 10)], ['k', new THREE.ConeGeometry(1, 1, 8)]].forEach(function (g) { var A = L[g[0]]; if (!A.length) return; var im = new THREE.InstancedMesh(g[1], new THREE.MeshLambertMaterial({ color: 0xffffff }), A.length), cc = new THREE.Color(); A.forEach(function (q, i) { QT.set(0, 0, 0, 1); if (g[0] === 'k') QT.setFromEuler(new THREE.Euler(Math.PI, 0, 0)); MX.compose(V1.set(q[0], q[1], q[2]), QT, V2.set(q[3], q[4], q[5])); im.setMatrixAt(i, MX); im.setColorAt(i, cc.setHex(q[6])); }); im.frustumCulled = false; G2.add(im); });
    var fr = bx(1.6, 2.4, 1, Mt(0x93c5fd), -8.9, 1.2, -6.7); fr.material.transparent = false; [.5, 1.1, 1.7].forEach(function (y) { for (var i = 0; i < 5; i++) { var o = cy(.07, .07, .3, Mt([0xef4444, 0x22c55e, 0xfacc15, 0xffffff, 0xf97316][i]), -9.6 + i * .34, y, -6.15, 8); } });
  })();
  (function () { var nomes = ['🥕 HORTIFRÚTI', '🍚 MERCEARIA', '🧃 BEBIDAS', '🍕 LANCHES'], fr = [0xef4444, 0xf97316, 0x84cc16, 0xfacc15, 0xdc2626, 0x22c55e]; K.SHELF.forEach(function (q, n) { var c = document.createElement('canvas'); c.width = 384; c.height = 72; var t = c.getContext('2d'); t.fillStyle = ['#15803d', '#b45309', '#0369a1', '#be185d'][n]; t.fillRect(0, 0, 384, 72); t.fillStyle = '#fff'; t.font = '800 40px Arial,sans-serif'; t.textAlign = 'center'; t.textBaseline = 'middle'; t.fillText(nomes[n], 192, 38); [1, -1].forEach(function (sd) { var pl = new THREE.Mesh(new THREE.PlaneGeometry(3.4, .64), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })); pl.position.set((q[0] + q[2]) / 2, 2.3, (sd > 0 ? q[3] + .03 : q[1] - .03)); if (sd < 0) pl.rotation.y = Math.PI; G2.add(pl); }); });
  })();
  bx(4, 1.05, 1, Mt(0x12507f), K.NPC.x, .53, K.NPC.z + 1.1); bx(4.2, .08, 1.2, WALL, K.NPC.x, 1.08, K.NPC.z + 1.1);
  var c = document.createElement('canvas'); c.width = 768; c.height = 128; var x = c.getContext('2d'); x.fillStyle = '#b91c1c'; x.fillRect(0, 0, 768, 128); x.fillStyle = '#fff'; x.font = '800 78px Arial,sans-serif'; x.textAlign = 'center'; x.fillText('MERCADINHO', 384, 92); var p = new THREE.Mesh(new THREE.PlaneGeometry(10, 1.65), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })); p.position.set(0, H + 1.05, -1.75); G2.add(p); bx(10.3, 1.9, .1, DARK, 0, H + 1.05, -1.84);
  K.BENCH.forEach(function (q) { bx(3, .45, 1, WOOD, q[0], .25, q[1]); bx(3, .7, .15, DARK, q[0], .75, q[1] - .5); cy2(q[0], q[1] + 1.7); }); function cy2(a, b) { var t = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 3, 6), DARK); t.position.set(a, 1.5, b + 1.8); G2.add(t); var l = new THREE.Mesh(new THREE.SphereGeometry(.3, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe2b0 })); l.position.set(a, 3.1, b + 1.8); G2.add(l); }
  var l2 = new THREE.PointLight(0xffd9a0, 1, 26, 1.4); l2.position.set(0, 5, 5); G2.add(l2);
  // ===== enfeites do mercadinho =====
  function cy(r1, r2, h, m, x, y, z, n) { var o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, n || 10), m); o.position.set(x, y, z); G2.add(o); return o; }
  var GOLD = Mt(0xd9b25a), LEAF = Mt(0x2f8f4e), TER = Mt(0xb66a3c), WHITE = Mt(0xffffff);
  // chão xadrez dentro da loja e toldo listrado na frente
  for (var ix = 0; ix < 10; ix++) for (var iz = 0; iz < 4; iz++) if ((ix + iz) % 2) bx(2, .012, 2, Mt(0xb9b1a2), -9 + ix * 2, .04, -9 + iz * 2);
  for (i = 0; i < 11; i++) { var aw = bx(1.82, .08, 2.8, i % 2 ? WHITE : RED, -9.1 + i * 1.82, H - .02, -.4); aw.rotation.x = .3; }
  bx(2.2, .03, 1.2, Mt(0x7a2e8f), 0, .05, .4);
  // cartazes
  [['OFERTAS', '#facc15', '#b91c1c', -6.3], ['PESCA', '#ffffff', '#12507f', 6.3]].forEach(function (q) { var cv = document.createElement('canvas'); cv.width = 256; cv.height = 128; var c2 = cv.getContext('2d'); c2.fillStyle = q[2]; c2.fillRect(0, 0, 256, 128); c2.fillStyle = q[1]; c2.font = '800 46px Arial,sans-serif'; c2.textAlign = 'center'; c2.fillText(q[0], 128, 80); var pl = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.7), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) })); pl.position.set(q[3], 1.9, -1.83); G2.add(pl); });
  // caixotes de frutas na frente
  [[-6, 3.7], [6, 3.7]].forEach(function (q, k) { bx(2.8, .7, 1.4, WOOD, q[0], .35, q[1]); bx(2.82, .05, .05, DARK, q[0], .7, q[1] - .68); bx(2.82, .05, .05, DARK, q[0], .7, q[1] + .68); var cc = k ? [0xf59e0b, 0xfb923c] : [0xe5484d, 0x84cc16]; for (var a = 0; a < 16; a++) { var f = new THREE.Mesh(new THREE.SphereGeometry(.17, 8, 6), Mt(cc[a % 2])); f.position.set(q[0] - 1.1 + (a % 6) * .44, .78 + (a > 11 ? .18 : 0), q[1] - .4 + Math.floor(a / 6) * .4); G2.add(f); } });
  // palmeiras em vasos
  function palm(x, z) { cy(.7, .55, .9, TER, x, .45, z, 12); cy(.14, .24, 6, Mt(0x7a5a3a), x, 3.5, z, 7); for (var i = 0; i < 8; i++) { var a = i / 8 * 6.283, l = new THREE.Mesh(new THREE.SphereGeometry(1, 7, 5), LEAF); l.position.set(x + Math.cos(a) * 1.7, 6.3, z + Math.sin(a) * 1.7); l.scale.set(2.1, .1, .45); l.rotation.y = -a; l.rotation.z = -.5; G2.add(l); } }
  palm(-14.5, -7.5); palm(14.5, -7.5); palm(-14.7, 9.3); palm(14.7, 9.3);
  [[-9, -1.55], [9, -1.55]].forEach(function (q) { bx(2.6, .35, .5, TER, q[0], .2, q[1]); for (var i = 0; i < 12; i++) { var f = new THREE.Mesh(new THREE.SphereGeometry(.13, 6, 4), Mt([0xff6fae, 0xfacc15, 0xffffff, 0xa78bfa][i % 4])); f.position.set(q[0] - 1.1 + i * .2, .46, q[1] + (i % 2 ? .1 : -.1)); G2.add(f); } });
  // corrimão em volta e luzinhas
  var pts = []; function rail(ax, az, bx2, bz, n) { for (var i = 0; i <= n; i++) { var f = i / n, x = ax + (bx2 - ax) * f, z = az + (bz - az) * f; pts.push([x, 1.36, z]); if (i % 2 === 0) cy(.04, .04, 1.2, GOLD, x, .6, z, 6); } var b = new THREE.Mesh(new THREE.BoxGeometry(Math.hypot(bx2 - ax, bz - az) + .1, .05, .05), GOLD); b.position.set((ax + bx2) / 2, 1.22, (az + bz) / 2); b.rotation.y = -Math.atan2(bz - az, bx2 - ax); G2.add(b); }
  rail(-K.W + .1, -K.D + .1, -K.W + .1, K.D - .1, 22); rail(K.W - .1, -K.D + .1, K.W - .1, K.D - .1, 22); rail(-K.W + .1, -K.D + .1, K.W - .1, -K.D + .1, 34); rail(-K.W + .1, K.D - .1, -1.6, K.D - .1, 16); rail(1.6, K.D - .1, K.W - .1, K.D - .1, 16);
  // varais de luz
  function line(a, b, n, sag) { for (var i = 0; i <= n; i++) { var f = i / n; pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f - Math.sin(f * 3.14) * sag, a[2] + (b[2] - a[2]) * f]); } } line([-14.5, 6, 9], [0, 6.2, -1.6], 24, 1); line([14.5, 6, 9], [0, 6.2, -1.6], 24, 1); line([-14.5, 6, 9], [14.5, 6, 9], 34, 1.1);
  // ===== mais enfeites =====
  // geladeiras brilhando no fundo da loja
  [-7, -2.4, 2.4, 7].forEach(function (x, i) { bx(2.2, 2.6, .5, Mt(0x9fb3c8), x, 1.3, -9.65 + .0); var g = bx(2, 2.3, .03, new THREE.MeshBasicMaterial({ color: i % 2 ? 0xa5f3fc : 0xbfdbfe }), x, 1.35, -9.38); [.55, 1.25, 1.95].forEach(function (y) { bx(1.9, .03, .03, Mt(0x64748b), x, y, -9.34); for (var k = 0; k < 7; k++) bx(.16, .3, .08, Mt(cols[(k + i) % 6]), x - .8 + k * .27, y + .17, -9.33); }); });
  // pirâmides de produtos, cestas e caixa registradora
  [[-2.8, -3.2, 0xe5484d], [2.8, -3.2, 0x22c55e]].forEach(function (q) { for (var y = 0; y < 4; y++) for (var a = 0; a <= 3 - y; a++) cy(.15, .15, .3, Mt(q[2]), q[0] - (3 - y) * .17 + a * .34, .16 + y * .3, q[1], 10); });
  bx(.9, .36, .6, Mt(0x111827), K.NPC.x + 1.2, 1.3, K.NPC.z + 1.1); bx(.5, .3, .05, new THREE.MeshBasicMaterial({ color: 0x4ade80 }), K.NPC.x + 1.2, 1.56, K.NPC.z + 1.33); for (i = 0; i < 3; i++) cy(.35, .28, .35, Mt(0x8b5cf6), -9.4 + i * .05, .2 + i * .24, -2.9, 12);
  [-5, 0, 5].forEach(function (x) { cy(.015, .015, .6, DARK, x, H - .3, -6, 6); var ab = new THREE.Mesh(new THREE.ConeGeometry(.45, .4, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xffd98a, side: THREE.DoubleSide })); ab.position.set(x, H - .7, -6); G2.add(ab); });
  // bandeirinhas coloridas
  var flags = []; function bandeira(a, b, n, sag) { for (var i = 0; i <= n; i++) { var f = i / n; flags.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f - Math.sin(f * 3.14) * sag, a[2] + (b[2] - a[2]) * f]); } } bandeira([-14.5, 5.6, -7.5], [14.5, 5.6, -7.5], 34, .7); bandeira([-14.7, 5.4, 9.3], [14.7, 5.4, 9.3], 34, .9); bandeira([-14.5, 5.4, -7.5], [-14.7, 5.4, 9.3], 20, .7); bandeira([14.5, 5.4, -7.5], [14.7, 5.4, 9.3], 20, .7); bandeira([-9.5, 3.3, -6], [9.5, 3.3, -6], 22, .2);
  var fg = new THREE.ConeGeometry(.2, .42, 3); fg.rotateX(Math.PI); var fi = new THREE.InstancedMesh(fg, new THREE.MeshBasicMaterial({ color: 0xffffff }), flags.length), fcol = [0xef4444, 0xfacc15, 0x22c55e, 0x3b82f6, 0xec4899, 0xa855f7], fm = new THREE.Matrix4(), fc = new THREE.Color(); flags.forEach(function (p, i) { fm.makeTranslation(p[0], p[1] - .22, p[2]); fi.setMatrixAt(i, fm); fi.setColorAt(i, fc.setHex(fcol[i % 6])); }); fi.frustumCulled = false; G2.add(fi);
  // ombrelones com mesa e cadeiras
  [[-13.5, -1.5, 0x7c3aed], [13.5, -1.5, 0x0ea5e9]].forEach(function (q) { cy(.9, .9, .08, WHITE, q[0], .8, q[1], 16); cy(.06, .06, 3.2, DARK, q[0], 1.6, q[1], 6); var o = new THREE.Mesh(new THREE.ConeGeometry(2.3, .9, 10), Mt(q[2])); o.position.set(q[0], 3.3, q[1]); G2.add(o); [-1, 1].forEach(function (s) { bx(.6, .5, .6, WOOD, q[0] + s * 1.1, .25, q[1]); }); [0xe5484d, 0xf59e0b].forEach(function (c, i) { var f = new THREE.Mesh(new THREE.SphereGeometry(.13, 8, 6), Mt(c)); f.position.set(q[0] + i * .25 - .1, .95, q[1]); G2.add(f); }); });
  // carrinho de sorvete e barril
  bx(2.2, 1, 1.2, Mt(0xfcd34d), -4.1, .75, 8); [-1, 1].forEach(function (s) { var r = new THREE.Mesh(new THREE.TorusGeometry(.26, .06, 6, 14), DARK); r.position.set(-4.1 + s * .8, .28, 8.62); G2.add(r); }); cy(.04, .04, 2, DARK, -4.1, 2, 8, 6); var ug = new THREE.Mesh(new THREE.ConeGeometry(1.6, .7, 10), Mt(0xf472b6)); ug.position.set(-4.1, 3.1, 8); G2.add(ug); [0xffffff, 0xf472b6, 0x7dd3fc].forEach(function (c, i) { var b = new THREE.Mesh(new THREE.SphereGeometry(.2, 8, 6), Mt(c)); b.position.set(-4.7 + i * .6, 1.38, 8); G2.add(b); });
  [[3.6, 8], [16.5, 2.6]].forEach(function (q) { cy(.65, .65, 1.1, WOOD, q[0], .55, q[1], 12); cy(.67, .67, .08, DARK, q[0], .3, q[1], 12); cy(.67, .67, .08, DARK, q[0], .85, q[1], 12); });
  // balões na entrada e boias no corrimão
  [[-3.1, 0x22d3ee], [3.1, 0xf472b6]].forEach(function (q) { for (var i = 0; i < 5; i++) { var b = new THREE.Mesh(new THREE.SphereGeometry(.34, 10, 8), Mt([0xef4444, 0xfacc15, 0x22c55e, q[1], 0xa855f7][i])); b.position.set(q[0] + (i - 2) * .32, 2.9 + (i % 2) * .5, -1.6); b.scale.y = 1.2; G2.add(b); } });
  [[-17.9, 1], [17.9, -4], [-8, 11.88], [8, 11.88]].forEach(function (q, i) { var t = new THREE.Mesh(new THREE.TorusGeometry(.5, .16, 8, 18), Mt(i % 2 ? 0xef4444 : 0xffffff)); t.position.set(q[0], 1, q[1]); if (Math.abs(q[0]) > 15) t.rotation.y = Math.PI / 2; G2.add(t); });
  // arco de flores na entrada do píer
  var arco = new THREE.Mesh(new THREE.TorusGeometry(1.75, .1, 8, 24, Math.PI), Mt(0x2f8f4e)); arco.position.set(0, 1.1, 11.3); G2.add(arco); for (i = 0; i < 22; i++) { var ang = i / 21 * Math.PI, fl = new THREE.Mesh(new THREE.SphereGeometry(.13, 6, 4), Mt([0xff6fae, 0xfacc15, 0xffffff, 0xfb7185][i % 4])); fl.position.set(Math.cos(ang) * 1.75, 1.1 + Math.sin(ang) * 1.75, 11.3); G2.add(fl); } [-1.75, 1.75].forEach(function (x) { cy(.1, .1, 1.1, DARK, x, .55, 11.3, 6); });
  // píer de pesca
  bx(2.8, .15, 11, WOOD, 0, .03, 15.5); for (i = 0; i < 22; i++) bx(2.82, .02, .05, DARK, 0, .12, 10.2 + i * .5); [-1.4, 1.4].forEach(function (x) { [12, 16, 20].forEach(function (z) { cy(.09, .09, 3.6, DARK, x, -1.1, z, 6); }); rail(x, 11.7, x, 20.9, 12); }); bx(2.9, .05, .05, GOLD, 0, 1.22, 20.95);
  [[-1.1, 13.5], [1.1, 18.5]].forEach(function (q) { cy(.5, .55, .6, Mt(0xe36b4a), q[0] * 1, .32, q[1], 10); }); var lb = new THREE.Mesh(new THREE.SphereGeometry(.25, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe2b0 })); lb.position.set(0, 2.55, 20.8); G2.add(lb); cy(.05, .05, 2.5, DARK, 0, 1.25, 20.9, 6); var l3 = new THREE.PointLight(0xffd9a0, .9, 16, 1.4); l3.position.set(0, 3, 18); G2.add(l3);
  var cols2 = [0xffe6a8, 0xff7ad9, 0x6fe9ff, 0xffe6a8, 0xb98cff], im = new THREE.InstancedMesh(new THREE.SphereGeometry(.06, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }), pts.length), mx = new THREE.Matrix4(), cc2 = new THREE.Color(); pts.forEach(function (p, i) { mx.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(i, mx); im.setColorAt(i, cc2.setHex(cols2[i % 5])); }); im.frustumCulled = false; G2.add(im);
  return { group: G2, solid: solid };
}
