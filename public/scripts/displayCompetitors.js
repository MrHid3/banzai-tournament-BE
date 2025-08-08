async function getResource(resourceName) {
    const request = await fetch(resourceName);
    return await request.json();
}

const competitors = await getResource("/getCompetitors");

console.log(competitors);