import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Assistente de Prevenção de Desastres</title>
        <meta name="description" content="Conscientização sobre desastres naturais" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            🛡️ Assistente de Prevenção de Desastres
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <p className="text-lg text-gray-600 text-center mb-4">
              Olá! Sou seu assistente virtual para prevenção de desastres naturais.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🌊 Enchentes</h3>
                <p className="text-sm text-blue-600">Aprenda sobre prevenção e segurança</p>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">🏔️ Deslizamentos</h3>
                <p className="text-sm text-amber-600">Sinais de alerta e evacuação</p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">🔥 Queimadas</h3>
                <p className="text-sm text-red-600">Prevenção e combate ao fogo</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">☀️ Secas</h3>
                <p className="text-sm text-yellow-600">Conservação de água e recursos</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
              <p className="text-green-800 font-semibold">
                ✅ Projeto funcionando!<br/>
                ✅ Deploy bem-sucedido na Vercel<br/>
                ✅ Pronto para demonstração!
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📞 Emergências</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="font-bold text-red-600 text-xl">199</p>
                <p className="text-sm text-red-800">Defesa Civil</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="font-bold text-red-600 text-xl">193</p>
                <p className="text-sm text-red-800">Bombeiros</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="font-bold text-red-600 text-xl">192</p>
                <p className="text-sm text-red-800">SAMU</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="font-bold text-red-600 text-xl">190</p>
                <p className="text-sm text-red-800">Polícia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
