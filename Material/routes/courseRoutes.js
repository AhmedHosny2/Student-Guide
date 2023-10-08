// get material route 
// this well get the course mat using its name

router.get("/get-content", async (req, res) => {
  const { course } = req.paramter;
  console.log(course);
  try {
    const material = await Material.findOne({ name: course });
    console.log(material);
    if (!material) {
      return res.status(400).json({ message: "material does not exist" });
    }
    res.status(200).json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// put material route 
// this well update the course mat using its name and add the user id to the list of users who have this material
// add its image to the fron end 
// increase his contribution with the number of letters he added / 100 ceiled 





