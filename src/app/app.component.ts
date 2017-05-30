import { Component } from '@angular/core';

@Component({
    selector: 'evolve-app',
    template: `
        <h1>Evolve</h1>
        <evolve-canvas></evolve-canvas>
    `,
})
export class AppComponent  { name = 'Evolve'; }
