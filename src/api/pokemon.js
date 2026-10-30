export async function getPokemonList(limit = 20, offset = 0) {
  const { data } = await api.get('/pokemon', { params: { limit, offset } });
  console.log(data)
  return data; // { count, next, previous, results: [{ name, url }] }
}