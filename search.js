const { request, recordsFrom, pick, isPnl } = require('../lib/pddikti');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Metode tidak diizinkan.' });
  const keyword = String(req.query.q || '').trim();
  if (keyword.length < 3 || keyword.length > 120) return res.status(400).json({ error: 'Masukkan nama dosen minimal 3 karakter.' });

  let lastError;
  const paths = req.query.fast === '1'
    ? [`/pencarian/dosen/${encodeURIComponent(keyword)}`]
    : [`/pencarian/dosen/${encodeURIComponent(keyword)}`, `/pencarian/en/call/${encodeURIComponent(keyword)}`];
  for (const path of paths) {
    try {
      const records = recordsFrom(await request(path));
      const data = records.filter(isPnl).map((record) => ({
        id: pick(record, ['id', 'id_dosen', 'id_sdm', 'id_person']),
        nama: pick(record, ['nama', 'nama_dosen']),
        nidn: pick(record, ['nidn']),
        nuptk: pick(record, ['nuptk']),
        nama_prodi: pick(record, ['nama_prodi', 'prodi']),
      })).filter((record) => record.id && record.nama);
      return res.status(200).json({ data });
    } catch (error) { lastError = error; }
  }
  return res.status(502).json({ error: lastError?.message || 'Pencarian dosen gagal.' });
};
