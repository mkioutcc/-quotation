// script.js

// 🛠 替換成你的 Supabase URL & Key
const SUPABASE_URL = 'https://jksztemokzoimzvvmmse.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprc3p0ZW1va3pvaW16dnZtbXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjUwMjIsImV4cCI6MjA1OTQ0MTAyMn0.a4dcqAau_TcITyn0fw0tLpAfK98zYCHDD0jaYXBpqlI'
// 使用不同的全域名稱避免衝突，並確保使用 CDN 提供的 supabase 物件
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})


// 👤 檢查是否已登入
async function checkAuthAndRedirect() {
  if (!window.supabaseClient) {
    console.error('Supabase client 未初始化');
    return null;
  }
  
  try {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user && !window.location.pathname.endsWith('login.html')) {
      window.location.href = 'login.html';
    }
    return user;
  } catch (error) {
    console.error('檢查登入狀態失敗:', error);
    return null;
  }
}

// 🚪 登出
async function signOut() {
  // 確保 supabaseClient 已初始化
  if (!window.supabaseClient) {
    console.error('Supabase client is not initialized.');
    return;
  }
  try {
    await window.supabaseClient.auth.signOut();
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error signing out:', error);
    // 處理錯誤
  }
}
