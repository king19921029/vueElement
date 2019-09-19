import OSS from 'ali-oss';

var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIztvATrgb7mgP',
  accessKeySecret: 'noWZVl417G1TaGQSYs3cmwVlqQJlhx',
  bucket: 'jiujing'
})

export const put = async (ObjName, fileUrl) => {
  try {
    let result = await client.put(ObjName, fileUrl)
    return result
  } catch (e) {
    console.log(e)
  }
}
