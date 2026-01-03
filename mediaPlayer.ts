interface MediaPlayerState {
  play(): void;
  pause(): void;
  stop(): void;
}

class PlayState implements MediaPlayerState {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("Already playing.");
  }

  pause(): void {
    console.log("Pausing media...");
    this.player.setState(this.player.pauseState);
  }

  stop(): void {
    console.log("Stopping media...");
    this.player.setState(this.player.stopState);
  }
}

class PauseState implements MediaPlayerState {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("Resuming media...");
    this.player.setState(this.player.playState);
  }

  pause(): void {
    console.log("Already paused.");
  }

  stop(): void {
    console.log("Stopping media from paused state...");
    this.player.setState(this.player.stopState);
  }
}

class StopState implements MediaPlayerState {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("Starting media from beginning...");
    this.player.setState(this.player.playState);
  }

  pause(): void {
    console.log("Cannot pause. Media is stopped.");
  }

  stop(): void {
    console.log("Media is already stopped.");
  }
}

class MediaPlayer {
  playState: MediaPlayerState;
  pauseState: MediaPlayerState;
  stopState: MediaPlayerState;
  currentState: MediaPlayerState;

  constructor() {
    this.playState = new PlayState(this);
    this.pauseState = new PauseState(this);
    this.stopState = new StopState(this);

    this.currentState = this.stopState;
  }

  setState(state: MediaPlayerState): void {
    this.currentState = state;
  }

  play(): void {
    this.currentState.play();
  }

  pause(): void {
    this.currentState.pause();
  }

  stop(): void {
    this.currentState.stop();
  }
}

const player = new MediaPlayer();

player.play();   
player.pause(); 
player.play();  
player.stop();   
player.pause();  
player.play();   
