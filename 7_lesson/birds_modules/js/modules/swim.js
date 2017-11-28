const Swim = (bird) => ({
  swim: () => console.log(`${bird.name} can swim with speed ${bird.speed} km/h`)
});

export default Swim;
