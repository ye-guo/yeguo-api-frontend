import { request } from '@umijs/max';

/** 接口注册 POST /api/interfaceInfo/register */
export async function interfaceInfoRegister(
  body: API.InterfaceRegisterParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/interfaceInfo/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 按照id删除接口 DELETE /api/interfaceInfo/${id} */
export async function interfaceInfoDelete(id: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/interfaceInfo/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 按照id修改接口 PUT /api/interfaceInfo/update */
export async function interfaceInfoUpdate(
  body: API.InterfaceUpdateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/interfaceInfo/update`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 动态接口查询 GET /api/interfaceInfo/dynamicQuery */
export async function interfaceInfoDynamicQuery(
  params: API.InterfaceInfoQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/interfaceInfo/dynamicQuery`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 在线接口调用 */
export async function onlineInvoking(
  body: any,
  accessKey: string,
  signature: string,
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();
  formData.append(
    'invokingRequest',
    new Blob([JSON.stringify(body)], { type: 'application/json' }),
  );
  if (file) {
    formData.append('file', file);
  }

  return request<API.ResponseData>(
    `/api/interfaceInfo/onlineInvoking?accessKey=${accessKey}&signature=${signature}`,
    {
      method: 'POST',
      data: formData,
      ...(options || {}),
    },
  );
}
