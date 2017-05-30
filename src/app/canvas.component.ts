import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { RenderService } from './render.service';

@Component({
    selector: 'evolve-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: [ './canvas.component.css' ],
    providers: [ RenderService ]
})

export class CanvasComponent implements OnInit {
    @ViewChild('glCanvas') canvas: ElementRef;
    gl: WebGLRenderingContext;

    constructor(private renderService: RenderService) {}

    ngAfterViewInit(): void {
        this.gl = this.canvas.nativeElement.getContext('webgl') ||
            this.canvas.nativeElement.getContext('experimental-webgl');

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}
