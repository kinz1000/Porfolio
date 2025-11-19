import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent  implements OnInit {

  @Output() finished = new EventEmitter<void>(); // 🔔 Evento que avisa a AppComponent

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initBlackhole('#blackhole');
  }

  private initBlackhole(selector: string): void {
    const container = this.el.nativeElement.querySelector(selector);
    const h = container.offsetHeight;
    const w = container.offsetWidth;
    const maxorbit = 255;
    const centery = h / 2;
    const centerx = w / 2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    const stars: Star[] = [];
    let collapse = false;
    let expanse = false;
    let returning = false;

    // Canvas setup
    const canvas = this.renderer.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    this.renderer.appendChild(container, canvas);
    const context = canvas.getContext('2d')!;
    context.globalCompositeOperation = 'multiply';
    this.setDPI(canvas, 192);

    const centerHover = container.querySelector('.centerHover') as HTMLElement;

    // ✨ Evento click: animación de salida y aviso al AppComponent
    centerHover.addEventListener('click', () => {
      collapse = false;
      expanse = true;
      returning = false;
      centerHover.classList.add('open');

      // Agregar clase de animación fade-out
      this.el.nativeElement.classList.add('fade-out');

      // Esperar la duración de la transición antes de emitir finished
      const duration = 1500; // Debe coincidir con CSS
      setTimeout(() => {
        this.finished.emit(); // 🔔 Notifica a AppComponent
      }, duration);
    });

    centerHover.addEventListener('mouseover', () => {
      if (!expanse) collapse = true;
    });

    centerHover.addEventListener('mouseout', () => {
      if (!expanse) collapse = false;
    });

    // Star class
    class Star {
      orbital: number;
      x: number;
      y: number;
      yOrigin: number;
      speed: number;
      rotation: number;
      startRotation: number;
      id: number;
      collapseBonus: number;
      color: string;
      hoverPos: number;
      expansePos: number;
      prevR: number;
      prevX: number;
      prevY: number;
      originalY: number;

      constructor() {
        const rands = [Math.random() * (maxorbit / 2) + 1, Math.random() * (maxorbit / 2) + maxorbit];
        this.orbital = (rands[0] + rands[1]) / 2;
        this.x = centerx;
        this.y = centery + this.orbital;
        this.yOrigin = this.y;
        this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
        this.rotation = 0;
        this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
        this.id = stars.length;
        this.collapseBonus = Math.max(0, this.orbital - (maxorbit * 0.7));
        this.color = `rgba(255,255,255,${1 - (this.orbital / 255)})`;
        this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus;
        this.expansePos = centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);
        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;
        this.originalY = this.yOrigin;

        stars.push(this);
      }

      draw() {
        if (!expanse && !returning) {
          this.rotation = this.startRotation + (currentTime * this.speed);
          if (!collapse) {
            if (this.y > this.yOrigin) this.y -= 2.5;
            if (this.y < this.yOrigin - 4) this.y += (this.yOrigin - this.y) / 10;
          } else {
            if (this.y > this.hoverPos) this.y -= (this.hoverPos - this.y) / -5;
            if (this.y < this.hoverPos - 4) this.y += 2.5;
          }
        } else if (expanse && !returning) {
          this.rotation = this.startRotation + (currentTime * (this.speed / 2));
          if (this.y > this.expansePos) this.y -= Math.floor(this.expansePos - this.y) / -80;
        } else if (returning) {
          this.rotation = this.startRotation + (currentTime * this.speed);
          if (Math.abs(this.y - this.originalY) > 2) {
            this.y += (this.originalY - this.y) / 50;
          } else {
            this.y = this.originalY;
            this.yOrigin = this.originalY;
          }
        }

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        const oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
        context.moveTo(oldPos[0], oldPos[1]);
        context.translate(centerx, centery);
        context.rotate(this.rotation);
        context.translate(-centerx, -centery);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    const rotate = (cx: number, cy: number, x: number, y: number, angle: number): [number, number] => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
      const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    };

    const loop = () => {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 50;

      context.fillStyle = 'rgba(25,25,25,0.2)';
      context.fillRect(0, 0, w, h);

      for (const star of stars) star.draw();

      requestAnimationFrame(loop);
    };

    for (let i = 0; i < 2500; i++) new Star();
    loop();
  }

  private setDPI(canvas: HTMLCanvasElement, dpi: number): void {
    if (!canvas.style.width) canvas.style.width = canvas.width + 'px';
    if (!canvas.style.height) canvas.style.height = canvas.height + 'px';
    const scaleFactor = dpi / 96;
    const width = canvas.width;
    const height = canvas.height;
    canvas.width = Math.ceil(width * scaleFactor);
    canvas.height = Math.ceil(height * scaleFactor);
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(scaleFactor, scaleFactor);
  }
}