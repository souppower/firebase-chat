import { Component, OnInit, OnDestroy } from '@angular/core';

declare let Firebase: any;

@Component({
    selector: 'firebase-app',
    template: require('./app.component.html')
})
export class AppComponent implements OnInit, OnDestroy {

    dataStore: any;
    userName: string;
    currentRoomName: string;
    roomList: string[];
    messages: string[];
    messageInput: HTMLInputElement

    constructor() {
        this.dataStore = new Firebase('https://fir-sample-404a3.firebaseio.com/');
    }

    ngOnInit() {
        this.roomList = [];
        this.messages = [];

        const roomName = document.getElementById('select-room');
        this.dataStore.on('child_added', (dataSnapshot: any) => {
            var key = dataSnapshot.key();
            this.roomList.push(key);
        });
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }

    get message(): string {
        const message = <HTMLInputElement>document.getElementById('message');
        return message.value;
    }

    clearMessageInput(): void {
        const message = <HTMLInputElement>document.getElementById('message');
        message.value = '';
    }

    clearMessageStream(): void {
        this.messages = [];
    }

    validatePost(): boolean {
        if(!this.userName || !this.currentRoomName || this.message === '') {
            return false;
        }

        return true;
    }

    post(e: KeyboardEvent): void {
        if(!this.validatePost()) {
            return;
        }

        this.dataStore.child(this.currentRoomName + '/messages').push({
            name: this.userName,
            message: this.message
        });
        this.clearMessageInput();
    }

    createRoom(): void {
        const roomName = prompt('ルーム名は？');
        if( roomName && roomName != '' ) {
            this.joinRoom(roomName);
        }
    }

    joinRoom(roomName: string): void {
        this.userName = this.userName ? this.userName : prompt('あなたの名前は？');
        if(this.userName === '') {
            this.userName = 'Guest';
        }

        this.leaveRoom();
        this.currentRoomName = roomName;

        this.clearMessageStream();
        this.clearMessageInput();

        const messages = this.dataStore.child(this.currentRoomName + '/messages');
        messages.push({
            message: this.userName + 'が入室しました'
        });

        messages.on('child_added', (dataSnapshot: any) => {
            var data = dataSnapshot.val();
            let message = data.name ? data.name + ' : ' : '';
            message += data.message;
            this.messages.push(message);
        });
    }

    leaveRoom(): void {
        if( this.currentRoomName ) {
            this.dataStore.child(this.currentRoomName + '/messages').push({
                'message': this.userName + 'が退室しました'
            });
        }
        this.currentRoomName = '';
    }

    getRoomColor(roomName: string): string {
        let color = 'black';
        if(roomName === this.currentRoomName) {
            color = 'blue';
        }
        return color;
    }
}
