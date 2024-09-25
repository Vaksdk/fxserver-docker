const FIVEM_CHANGELOG_ENDPOINT =
  "https://changelogs-live.fivem.net/api/changelog/versions/linux/server";
const LAST_BUILD_ID = 1234;

/**
 * 
 * @param {{[{build_id: string, url: string}]}} builds 
 */
function generate_matrix(builds) {
  return {
    include: builds
  }
}

/**
 * 
 * @returns {[{build_id: string, url: string}]}
 */
async function fetchBuilds() {
  const res = await fetch(FIVEM_CHANGELOG_ENDPOINT).then((res) => res.json());

  const builds = [
    { build_id: res.critial, url: res.critical_download},
    { build_id: res.recomended, url: res.recomended_download },
    { build_id: res.optional, url: res.optional_download },
    { build_id: res.latest, url: res.latest_download },
  ].filter(b => b.build_id > LAST_BUILD_ID);

  return builds;
}

fetchBuilds().then(generate_matrix).then(include => {
  // GITHUB OUTPUT FORMAT: {name}={value}
  console.log(`matrix=${JSON.stringify(include)}`);
})