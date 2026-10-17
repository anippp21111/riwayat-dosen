# Riwayat Dosen PNL

Aplikasi ini memakai halaman statis HTML/CSS/JavaScript dan Vercel Functions berbasis Node.js. Tidak memerlukan PHP atau database.

## Deploy ke Vercel

1. Push folder proyek ini ke repository Git.
2. Import repository tersebut di Vercel.
3. Pilih preset **Other** atau biarkan Vercel mendeteksi proyek statis.
4. Biarkan **Build Command** dan **Output Directory** kosong, lalu deploy.

`index.html` menjadi halaman utama. File di folder `api/` menjadi endpoint serverless. Endpoint riwayat dosen mengakses PDDikti; hasil ekspor disimpan di cache browser untuk mempercepat unduhan berikutnya.

Unduhan dibuat dalam CSV UTF-8 yang bisa dibuka dengan Microsoft Excel. Akses PDDikti dapat dibatasi oleh layanan upstream; kolom status pada hasil ekspor menunjukkan dosen yang riwayatnya tidak berhasil dimuat.
