const Run = (bird) => ({
  run: () => {
    console.log(`${bird.name} can run with speed ${bird.speed} km/h`);
  }
});

export default Run;
