# Simulasi Pemilihan Kepala Desa (Pilkades) 🗳️

Aplikasi web interaktif untuk simulasi E-Voting pemilihan Kepala Desa (Pilkades) Karangsari, Kecamatan Binong, Kabupaten Subang Tahun 2026.

Dibuat 100% presisi mengikuti alur dan tampilan 6 foto referensi yang Anda berikan.

---

## 📸 Alur Tampilan & Fitur (Sesuai 6 Foto Referensi)

1. **Foto 1 (Tampilan Awal - Surat Suara):**
   - Header resmi:
     - `SURAT SUARA`
     - `PEMILIHAN KEPALA DESA KARANGSARI`
     - `KECAMATAN BINONG KABUPATEN SUBANG`
     - `TAHUN 2026`
   - 2 kartu kandidat bersanding dengan bingkai biru (*default*), foto kandidat jas & dasi merah, dan teks `XXXXXXXXXX`.
   - Tombol utama di bawah: **`PILIH KANDIDAT INI`**.

2. **Foto 2 (Peringatan Belum Memilih):**
   - Jika tombol **`PILIH KANDIDAT INI`** ditekan saat belum ada calon yang dipilih, muncul popup modal gelap:
     > *"Silakan klik/pilih salah satu foto kandidat terlebih dahulu!"*
   - Tombol **`Tutup`** berwarna biru untuk kembali ke surat suara.

3. **Foto 3 (Pemilihan Kandidat):**
   - Ketika salah satu calon ditekan/diklik, kartu calon tersebut langsung mendapatkan penanda **bingkai garis merah tebal (*active state*)**, sedangkan calon lainnya tetap berbingkai biru.

4. **Foto 4 (Modal Konfirmasi Pemilihan):**
   - Setelah memilih calon dan menekan **`PILIH KANDIDAT INI`**, muncul popup konfirmasi:
     - Judul: **`KONFIRMASI PEMILIHAN`**
     - Keterangan: *"Anda yakin akan memilih kandidat ini?"*
     - Pratinjau foto & nama kandidat terpilih.
     - Dua tombol aksi:
       1. **`ULANGI`** (Merah): Untuk membatalkan dan kembali memilih ulang.
       2. **`PILIH`** (Biru): Untuk menyetujui dan mengirim suara.

5. **Foto 5 (Status Sukses & Tersimpan):**
   - Setelah menekan tombol **`PILIH`**, muncul popup notifikasi sukses:
     - Ikon centang hijau (*badge checkmark*).
     - Judul: **`Terima Kasih`**
     - Subjudul: **`Suara berhasil dikirim dan tersimpan`** (warna hijau).
     - Keterangan: *"Memuat tanda bukti..."*
   - Secara otomatis berpindah (*auto-transition*) ke layar tanda bukti barcode/QR dalam waktu ~1.8 detik.

6. **Foto 6 (Layar Tanda Bukti QR Code):**
   - Header: **`QR CODE HASIL PILIHAN`**
   - Barcode QR Code aktif yang bisa di-scan dengan kamera smartphone / QR Scanner (berisi data payload digital hasil suara & nomor urut).
   - Baris informasi: `Pilihan: XXXXXXXXXX | 20/11/2026, 10:10:10` (jam dan tanggal dinamis real-time saat simulasi dilakukan).
   - Tombol **`SIMPAN QR CODE`**: Mengunduh QR Code langsung ke perangkat dalam format file PNG.
   - Tombol **`🖨️ CETAK ULANG`**: Membuka dialog print struk / thermal receipt cetak bukti suara.
   - Teks disclaimer: *"QR ini hanya berisi bukti pilihan simulasi pada perangkat ini. Bukan bukti suara resmi dan tidak dikirim ke server."*
   - Tombol **`KEMBALI KE AWAL`**: Me-reset seluruh simulasi dan mengembalikan tampilan ke Foto 1 untuk pemilih berikutnya.

---

## 🚀 Cara Menjalankan

Anda dapat langsung membuka aplikasi ini dengan salah satu cara berikut:

1. **Cara Paling Mudah:**
   - Cukup **klik dua kali (*double click*)** file **[`buka_aplikasi.bat`](file:///c:/Users/SINTESA/Desktop/SIMULASI%20PILKADES/buka_aplikasi.bat)** atau file **[`index.html`](file:///c:/Users/SINTESA/Desktop/SIMULASI%20PILKADES/index.html)**.
   - Aplikasi akan langsung terbuka di browser Anda (Google Chrome, Microsoft Edge, dll).
   - **Bisa dijalankan 100% OFFLINE tanpa internet.**

---

## 🔊 Fitur Audio & Interaktivitas
- Efek suara responsif (*sound effects tap, alert, & success chime*) menggunakan Web Audio API internal tanpa ketergantungan file luar.
