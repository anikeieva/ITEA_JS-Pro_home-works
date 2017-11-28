const Fly = (bird) => ({
  fly: () => {
    console.log(`${bird.name} can fly with speed ${bird.speed} km/h`);
  }
});

export default Fly;
